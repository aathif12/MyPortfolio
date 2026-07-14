import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus, faTrash, faExpand, faTimes, faVideo, faPen,
  faFolderPlus, faCheck, faChevronDown, faChevronUp,
  faUpload, faLink, faVrCardboard, faImage,
  faDraftingCompass, faInfoCircle, faSpinner,
  faFolderOpen, faFilter, faPalette, faCamera,
} from "@fortawesome/free-solid-svg-icons";

// ─────────────────────────────────────────────────────────────────────────────
const STORAGE_KEY = "gd_sections_meta_v5";

// ── Global item-type registry ─────────────────────────────────────────────────
const ITEM_TYPES = {
  poster:    { label: "Poster",       icon: faPalette,         color: "#f4d259" },
  image:     { label: "2D Photo",     icon: faCamera,          color: "#59b2f4" },
  video:     { label: "Video",        icon: faVideo,           color: "#f4a259" },
  floorplan: { label: "Floor Plan",   icon: faDraftingCompass, color: "#7ecfb3" },
  virtual:   { label: "Virtual Tour", icon: faVrCardboard,     color: "#c47ef4" },
  link:      { label: "Link",         icon: faLink,            color: "#aaa" },
};

// ── Per-section configuration ─────────────────────────────────────────────────
// Each entry defines: badge, accentColor, uploadTypes[]
// uploadTypes: { key, label, icon, color, folder, accept }
//   folder = null  →  link-only (no file upload)
const SECTION_CONFIGS = {
  "parliament-election-2025": {
    badge: "🗳️ Campaign",
    accentColor: "#f4d259",
    uploadTypes: [
      { key: "poster", label: "Upload Posters",   icon: faPalette, color: "#f4d259", folder: "posters",   accept: "image/*" },
      { key: "image",  label: "Upload 2D Photos", icon: faCamera,  color: "#59b2f4", folder: "2d-photos", accept: "image/*" },
      { key: "video",  label: "Upload Videos",    icon: faVideo,   color: "#f4a259", folder: "videos",    accept: "video/*" },
    ],
    filterKeys: ["all", "poster", "image", "video"],
  },
  "local-election-2025": {
    badge: "🗳️ Campaign",
    accentColor: "#f4d259",
    uploadTypes: [
      { key: "poster", label: "Upload Posters",   icon: faPalette, color: "#f4d259", folder: "posters",   accept: "image/*" },
      { key: "image",  label: "Upload 2D Photos", icon: faCamera,  color: "#59b2f4", folder: "2d-photos", accept: "image/*" },
      { key: "video",  label: "Upload Videos",    icon: faVideo,   color: "#f4a259", folder: "videos",    accept: "video/*" },
    ],
    filterKeys: ["all", "poster", "image", "video"],
  },
  "taurgo": {
    badge: "🏠 Taurgo",
    accentColor: "#c47ef4",
    uploadTypes: [
      { key: "floorplan", label: "Upload Floor Plans",   icon: faDraftingCompass, color: "#7ecfb3", folder: "floor-plans", accept: "image/*" },
      { key: "image",     label: "Upload 2D Photos",     icon: faCamera,          color: "#59b2f4", folder: "2d-photos",   accept: "image/*" },
      { key: "virtual",   label: "Add Virtual Tour",     icon: faVrCardboard,     color: "#c47ef4", folder: null,          accept: null },
    ],
    filterKeys: ["all", "floorplan", "image", "virtual"],
  },
};

// ── Default sections ──────────────────────────────────────────────────────────
const DEFAULT_SECTIONS = [
  { id: "parliament-election-2025", title: "Parliament Election Campaign 2025", items: [] },
  { id: "local-election-2025",      title: "Local Election 2025",               items: [] },
  { id: "taurgo",                   title: "Taurgo",                            items: [] },
];

// ── localStorage helpers ──────────────────────────────────────────────────────
const loadSections = () => {
  try { const r = localStorage.getItem(STORAGE_KEY); if (r) return JSON.parse(r); } catch {}
  return DEFAULT_SECTIONS;
};
const saveSections = (s) => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch {} };

// ── Kuula URL → embed URL ─────────────────────────────────────────────────────
const toKuulaEmbed = (url) => {
  url = url.trim();
  if (url.includes("kuula.co/post/")) {
    const id = url.split("kuula.co/post/")[1].split(/[?#]/)[0];
    return `https://kuula.co/share/${id}?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1`;
  }
  return url;
};

// ── Upload to Vite server → public/designs/<path>/ ───────────────────────────
const uploadToServer = async (files, uploadPath) => {
  const fd = new FormData();
  fd.append("sectionId", uploadPath);
  for (const f of files) fd.append("files", f);
  const res = await fetch("/api/upload", { method: "POST", body: fd });
  if (!res.ok) throw new Error(`Upload failed: ${res.status}`);
  return await res.json();
};

// ─────────────────────────────────────────────────────────────────────────────
const GraphicDesign = () => {
  const [sections, setSections]   = useState(loadSections);
  const [lightbox, setLightbox]   = useState(null);
  const [collapsed, setCollapsed] = useState({});
  const [editingItemId, setEditingItemId]             = useState(null);
  const [editingSectionId, setEditingSectionId]       = useState(null);
  const [editingSectionTitle, setEditingSectionTitle] = useState("");
  const [showNewSection, setShowNewSection]           = useState(false);
  const [newSectionName, setNewSectionName]           = useState("");
  const [uploading, setUploading]                     = useState({}); // { uploadPath: bool }
  // Per-section active filter: { sectionId: filterKey }
  const [sectionFilters, setSectionFilters] = useState({});
  // Link modal
  const [linkModal, setLinkModal] = useState(null);
  const [linkInput, setLinkInput] = useState("");
  const [linkTitle, setLinkTitle] = useState("");
  const [linkType, setLinkType]   = useState("virtual");

  // File input refs: { `${sectionId}__${typeKey}`: inputEl }
  const typeFileRefs = useRef({});
  const genericRefs  = useRef({});

  useEffect(() => { saveSections(sections); }, [sections]);

  const getFilter = (secId) => sectionFilters[secId] || "all";
  const setFilter = (secId, key) =>
    setSectionFilters((p) => ({ ...p, [secId]: key }));

  // ── File upload ───────────────────────────────────────────────────────────
  const handleFileChange = async (e, sectionId, itemType, uploadPath) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    e.target.value = "";
    setUploading((p) => ({ ...p, [uploadPath]: true }));
    try {
      const result = await uploadToServer(files, uploadPath);
      const newItems = result.files.map((f) => ({
        id:        `item-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        src:       f.url,
        type:      f.mimetype.startsWith("video") ? "video" : itemType,
        title:     f.originalName.replace(/\.[^/.]+$/, ""),
        desc:      "",
        savedPath: f.url,
      }));
      setSections((prev) =>
        prev.map((s) =>
          s.id === sectionId ? { ...s, items: [...s.items, ...newItems] } : s
        )
      );
    } catch (err) {
      alert("Upload failed: " + err.message + "\n\nMake sure the dev server is running.");
    } finally {
      setUploading((p) => ({ ...p, [uploadPath]: false }));
    }
  };

  // ── Add link / virtual tour ───────────────────────────────────────────────
  const addLinkItem = (sectionId) => {
    const url = linkInput.trim();
    if (!url) return;
    const embedUrl = linkType === "virtual" ? toKuulaEmbed(url) : url;
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              items: [...s.items, {
                id:          `item-${Date.now()}-${Math.random().toString(36).slice(2)}`,
                src:         embedUrl,
                originalUrl: url,
                type:        linkType,
                title:       linkTitle.trim() || (linkType === "virtual" ? "Virtual Tour" : "Link"),
                desc:        "",
              }],
            }
          : s
      )
    );
    setLinkModal(null); setLinkInput(""); setLinkTitle(""); setLinkType("virtual");
  };

  // ── Remove / update ───────────────────────────────────────────────────────
  const removeItem = (sectionId, itemId) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId ? { ...s, items: s.items.filter((i) => i.id !== itemId) } : s
      )
    );
    if (lightbox?.id === itemId) setLightbox(null);
  };

  const updateItem = (sectionId, itemId, field, value) =>
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? { ...s, items: s.items.map((i) => i.id === itemId ? { ...i, [field]: value } : i) }
          : s
      )
    );

  // ── Section management ────────────────────────────────────────────────────
  const addSection = () => {
    const name = newSectionName.trim();
    if (!name) return;
    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    setSections((prev) => [...prev, { id, title: name, items: [] }]);
    setNewSectionName(""); setShowNewSection(false);
  };

  const removeSection = (sectionId) => {
    if (window.confirm(`Remove "${sectionId}" section? (Files on disk stay.)`))
      setSections((prev) => prev.filter((s) => s.id !== sectionId));
  };

  const startEditSection = (sec) => { setEditingSectionId(sec.id); setEditingSectionTitle(sec.title); };
  const saveEditSection = () => {
    const name = editingSectionTitle.trim();
    if (!name) return;
    setSections((prev) => prev.map((s) => s.id === editingSectionId ? { ...s, title: name } : s));
    setEditingSectionId(null);
  };
  const toggleCollapse = (id) => setCollapsed((p) => ({ ...p, [id]: !p[id] }));

  // ── Render one card ───────────────────────────────────────────────────────
  const renderCard = (item, sec) => {
    const typeInfo = ITEM_TYPES[item.type] || ITEM_TYPES.image;
    const isVirtual = item.type === "virtual";
    const isLink    = item.type === "link";
    const isMedia   = !isVirtual && !isLink;

    return (
      <div className="gd-card" key={item.id}>
        <div
          className="gd-media-wrap"
          onClick={() => isMedia && setLightbox(item)}
          style={{ cursor: isMedia ? "pointer" : "default" }}
        >
          {item.type === "video" ? (
            <video src={item.src} className="gd-media" muted preload="metadata" />
          ) : isVirtual ? (
            <iframe src={item.src} className="gd-media gd-iframe" title={item.title}
              allowFullScreen allow="xr-spatial-tracking; gyroscope; accelerometer"
              style={{ border: "none", pointerEvents: "auto" }} />
          ) : isLink ? (
            <a href={item.src} target="_blank" rel="noopener noreferrer" className="gd-link-card">
              <FontAwesomeIcon icon={faLink} className="gd-link-icon" />
              <span>{item.title}</span>
            </a>
          ) : (
            <img src={item.src} alt={item.title} className="gd-media" />
          )}
          {isMedia && (
            <div className="gd-overlay">
              <FontAwesomeIcon icon={item.type === "video" ? faVideo : faExpand} className="gd-overlay-icon" />
              <span>{item.type === "video" ? "Play" : "View Full"}</span>
            </div>
          )}
        </div>

        <div className="gd-card-info">
          <span className="gd-type-badge"
            style={{ background: typeInfo.color + "22", color: typeInfo.color, borderColor: typeInfo.color + "55" }}>
            <FontAwesomeIcon icon={typeInfo.icon} /> {typeInfo.label}
          </span>

          {editingItemId === item.id ? (
            <>
              <input className="gd-edit-input" value={item.title}
                onChange={(e) => updateItem(sec.id, item.id, "title", e.target.value)} placeholder="Title" />
              <textarea className="gd-edit-textarea" value={item.desc} rows={2}
                onChange={(e) => updateItem(sec.id, item.id, "desc", e.target.value)} placeholder="Description..." />
              <button className="gd-done-btn" onClick={() => setEditingItemId(null)}>
                <FontAwesomeIcon icon={faCheck} /> &nbsp;Done
              </button>
            </>
          ) : (
            <>
              <h4 className="gd-card-title">{item.title || "Untitled"}</h4>
              {item.desc && <p className="gd-card-desc">{item.desc}</p>}
              {item.savedPath && (
                <span className="gd-saved-path" title={item.savedPath}>
                  <FontAwesomeIcon icon={faFolderOpen} /> {item.savedPath.replace("/designs/", "")}
                </span>
              )}
              <div className="gd-card-actions">
                <button className="gd-action-btn" onClick={() => setEditingItemId(item.id)} title="Edit">
                  <FontAwesomeIcon icon={faPen} />
                </button>
                {(isVirtual || isLink) && (
                  <a href={item.originalUrl || item.src} target="_blank" rel="noopener noreferrer"
                    className="gd-action-btn" title="Open link">
                    <FontAwesomeIcon icon={faLink} />
                  </a>
                )}
                <button className="gd-action-btn gd-delete" onClick={() => removeItem(sec.id, item.id)} title="Remove">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  // ── Generic config-driven sub-typed section ───────────────────────────────
  const renderSubtypedSection = (sec) => {
    const config      = SECTION_CONFIGS[sec.id];
    const isCollapsed = collapsed[sec.id];
    const activeFilter = getFilter(sec.id);

    const filterKeys = config?.filterKeys || ["all"];
    const uploadTypes = config?.uploadTypes || [];
    const accentColor = config?.accentColor || "#59b2f4";
    const badge       = config?.badge || null;

    // Counts per type
    const counts = { all: sec.items.length };
    filterKeys.forEach((k) => {
      if (k !== "all") counts[k] = sec.items.filter((i) => i.type === k).length;
    });

    // Filtered items
    const filteredItems = activeFilter === "all"
      ? sec.items
      : sec.items.filter((i) => i.type === activeFilter);

    // Folder info lines
    const folderLines = uploadTypes
      .filter((t) => t.folder)
      .map((t) => ({
        label: t.label.replace("Upload ", ""),
        folder: `${sec.id}/${t.folder}/`,
        color: t.color,
        icon: t.icon,
      }));

    return (
      <div className="gd-section gd-section-typed" key={sec.id}
        style={{ "--section-accent": accentColor }}>

        {/* Section Header */}
        <div className="gd-section-header" style={{ borderBottomColor: accentColor + "30" }}>
          <div className="gd-section-title-row">
            {editingSectionId === sec.id ? (
              <>
                <input className="gd-new-section-input" value={editingSectionTitle}
                  onChange={(e) => setEditingSectionTitle(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && saveEditSection()} autoFocus />
                <button className="gd-done-btn" onClick={saveEditSection}><FontAwesomeIcon icon={faCheck} /></button>
                <button className="gd-cancel-btn" onClick={() => setEditingSectionId(null)}>Cancel</button>
              </>
            ) : (
              <>
                {badge && <span className="gd-section-badge" style={{ background: accentColor + "20", color: accentColor, borderColor: accentColor + "50" }}>{badge}</span>}
                <h3 className="gd-section-title" style={{ color: accentColor }}>{sec.title}</h3>
                <span className="gd-section-count">{sec.items.length} item{sec.items.length !== 1 ? "s" : ""}</span>
              </>
            )}
          </div>
          <div className="gd-section-actions">
            <button className="gd-action-btn" title="Rename" onClick={() => startEditSection(sec)}>
              <FontAwesomeIcon icon={faPen} />
            </button>
            <button className="gd-action-btn gd-delete" title="Remove section" onClick={() => removeSection(sec.id)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <button className="gd-action-btn" onClick={() => toggleCollapse(sec.id)}>
              <FontAwesomeIcon icon={isCollapsed ? faChevronDown : faChevronUp} />
            </button>
          </div>
        </div>

        {!isCollapsed && (
          <>
            {/* ── Upload Toolbar ── */}
            <div className="gd-taurgo-toolbar" style={{ borderBottomColor: accentColor + "18" }}>
              {uploadTypes.map((t) => {
                const uploadPath = t.folder ? `${sec.id}/${t.folder}` : null;
                const refKey = `${sec.id}__${t.key}`;
                if (!t.folder) {
                  // Link-only button (e.g. virtual tour)
                  return (
                    <button key={t.key}
                      className="gd-taurgo-upload-btn"
                      style={{ background: t.color + "18", borderColor: t.color, color: t.color }}
                      onClick={() => { setLinkModal({ sectionId: sec.id }); setLinkType(t.key); }}>
                      <FontAwesomeIcon icon={t.icon} /> {t.label}
                    </button>
                  );
                }
                return (
                  <span key={t.key}>
                    <button
                      className="gd-taurgo-upload-btn"
                      style={{ background: t.color + "18", borderColor: t.color, color: t.color }}
                      disabled={uploading[uploadPath]}
                      title={`Save to: public/designs/${uploadPath}/`}
                      onClick={() => typeFileRefs.current[refKey]?.click()}
                    >
                      {uploading[uploadPath]
                        ? <><FontAwesomeIcon icon={faSpinner} spin /> Uploading…</>
                        : <><FontAwesomeIcon icon={faUpload} /> <FontAwesomeIcon icon={t.icon} /> {t.label}</>}
                    </button>
                    <input
                      ref={(el) => (typeFileRefs.current[refKey] = el)}
                      type="file" accept={t.accept} multiple style={{ display: "none" }}
                      onChange={(e) => handleFileChange(e, sec.id, t.key, uploadPath)}
                    />
                  </span>
                );
              })}
            </div>

            {/* ── Folder Info ── */}
            <div className="gd-taurgo-folders">
              {folderLines.map((f) => (
                <span key={f.folder}>
                  <FontAwesomeIcon icon={faFolderOpen} style={{ color: f.color }} />
                  {" "}{f.label} → <code>public/designs/{f.folder}</code>
                </span>
              ))}
            </div>

            {/* ── Filter Tabs ── */}
            {sec.items.length > 0 && (
              <div className="gd-taurgo-filter-bar">
                {filterKeys.map((key) => {
                  const t = key === "all" ? null : uploadTypes.find((u) => u.key === key);
                  const icon = key === "all" ? faFilter : (t?.icon || faImage);
                  const label = key === "all" ? "All" : (ITEM_TYPES[key]?.label || key);
                  return (
                    <button
                      key={key}
                      className={`gd-taurgo-tab${activeFilter === key ? " active" : ""}`}
                      style={activeFilter === key
                        ? { background: accentColor, borderColor: accentColor, boxShadow: `0 0 0.7rem ${accentColor}80` }
                        : { borderColor: accentColor + "50" }}
                      onClick={() => setFilter(sec.id, key)}
                    >
                      <FontAwesomeIcon icon={icon} />
                      <span>{label}</span>
                      <span className="gd-tab-count">{counts[key] ?? 0}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* ── Grid / Empty ── */}
            {sec.items.length === 0 ? (
              <div className="gd-empty">
                <FontAwesomeIcon icon={faUpload} className="gd-empty-icon" style={{ color: accentColor }} />
                <p>Use the buttons above to upload content to this section.</p>
                <div className="gd-empty-paths">
                  {folderLines.map((f) => (
                    <span key={f.folder}>
                      <FontAwesomeIcon icon={f.icon} style={{ color: f.color }} />
                      {" "}<code>{f.folder}</code>
                    </span>
                  ))}
                </div>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="gd-empty">
                <p>No {ITEM_TYPES[activeFilter]?.label || activeFilter} yet in this section.</p>
              </div>
            ) : (
              <div className="gd-grid">
                {filteredItems.map((item) => renderCard(item, sec))}
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  // ── Generic plain section (for user-created custom sections) ──────────────
  const renderGenericSection = (sec) => (
    <div className="gd-section" key={sec.id}>
      <div className="gd-section-header">
        <div className="gd-section-title-row">
          {editingSectionId === sec.id ? (
            <>
              <input className="gd-new-section-input" value={editingSectionTitle}
                onChange={(e) => setEditingSectionTitle(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && saveEditSection()} autoFocus />
              <button className="gd-done-btn" onClick={saveEditSection}><FontAwesomeIcon icon={faCheck} /></button>
              <button className="gd-cancel-btn" onClick={() => setEditingSectionId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <h3 className="gd-section-title">{sec.title}</h3>
              <span className="gd-section-count">{sec.items.length} item{sec.items.length !== 1 ? "s" : ""}</span>
              <span className="gd-folder-tag"><FontAwesomeIcon icon={faFolderOpen} /> public/designs/{sec.id}/</span>
            </>
          )}
        </div>
        <div className="gd-section-actions">
          <button className="gd-action-btn gd-upload-to-btn"
            disabled={uploading[sec.id]}
            onClick={() => genericRefs.current[sec.id]?.click()}>
            {uploading[sec.id]
              ? <><FontAwesomeIcon icon={faSpinner} spin /> Uploading…</>
              : <><FontAwesomeIcon icon={faUpload} /> &nbsp;Upload</>}
          </button>
          <input ref={(el) => (genericRefs.current[sec.id] = el)}
            type="file" accept="image/*,video/*" multiple style={{ display: "none" }}
            onChange={(e) => handleFileChange(e, sec.id, "image", sec.id)} />
          <button className="gd-action-btn" onClick={() => { setLinkModal({ sectionId: sec.id }); setLinkType("virtual"); }}>
            <FontAwesomeIcon icon={faVrCardboard} />
          </button>
          <button className="gd-action-btn" onClick={() => startEditSection(sec)}>
            <FontAwesomeIcon icon={faPen} />
          </button>
          <button className="gd-action-btn gd-delete" onClick={() => removeSection(sec.id)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
          <button className="gd-action-btn" onClick={() => toggleCollapse(sec.id)}>
            <FontAwesomeIcon icon={collapsed[sec.id] ? faChevronDown : faChevronUp} />
          </button>
        </div>
      </div>
      {!collapsed[sec.id] && (
        sec.items.length === 0 ? (
          <div className="gd-empty" onClick={() => genericRefs.current[sec.id]?.click()}>
            <FontAwesomeIcon icon={faUpload} className="gd-empty-icon" />
            <p>Click Upload to add images or videos.</p>
            <p className="gd-empty-note">Saved to: <code>public/designs/{sec.id}/</code></p>
          </div>
        ) : (
          <div className="gd-grid">
            {sec.items.map((item) => renderCard(item, sec))}
          </div>
        )
      )}
    </div>
  );

  // ── Main render ───────────────────────────────────────────────────────────
  return (
    <section className="graphic-design" id="graphic-design">
      <h2 className="heading">Design <span>Experience</span></h2>
      <p className="gd-subtitle">
        A curated showcase of my graphic design work — election campaigns, architectural plans & virtual tours.
      </p>

      {/* Storage Info */}
      <div className="gd-storage-info">
        <FontAwesomeIcon icon={faInfoCircle} />
        <span>
          <strong>Files saved permanently</strong> to <code>public/designs/[section]/[type]/</code> on your computer —
          separate subfolder per content type per section.
        </span>
      </div>

      {/* Add New Section */}
      <div className="gd-add-section-wrap">
        {showNewSection ? (
          <div className="gd-new-section-row">
            <input className="gd-new-section-input"
              placeholder="Section name (e.g. Social Media Designs)"
              value={newSectionName}
              onChange={(e) => setNewSectionName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addSection()} autoFocus />
            <button className="gd-done-btn" onClick={addSection}><FontAwesomeIcon icon={faCheck} /> &nbsp;Create</button>
            <button className="gd-cancel-btn" onClick={() => { setShowNewSection(false); setNewSectionName(""); }}>Cancel</button>
          </div>
        ) : (
          <button className="btn gd-add-section-btn" onClick={() => setShowNewSection(true)}>
            <FontAwesomeIcon icon={faFolderPlus} /> &nbsp;Add New Section
          </button>
        )}
      </div>

      {/* Render all sections */}
      {sections.map((sec) =>
        SECTION_CONFIGS[sec.id]
          ? renderSubtypedSection(sec)
          : renderGenericSection(sec)
      )}

      {/* Link / Tour Modal */}
      {linkModal && (
        <div className="gd-lightbox" onClick={() => setLinkModal(null)}>
          <div className="gd-link-modal" onClick={(e) => e.stopPropagation()}>
            <div className="gd-link-modal-header">
              <h3>Add Virtual Tour or Link</h3>
              <button className="gd-lightbox-close" style={{ position: "static", fontSize: "1.4rem" }}
                onClick={() => setLinkModal(null)}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="gd-link-modal-type-row">
              {[
                { key: "virtual",   label: "Kuula / 360 Tour",  icon: faVrCardboard },
                { key: "image",     label: "2D Photo (URL)",     icon: faCamera },
                { key: "floorplan", label: "Floor Plan (URL)",   icon: faDraftingCompass },
                { key: "link",      label: "External Link",      icon: faLink },
              ].map(({ key, label, icon }) => (
                <button key={key} className={`gd-type-btn${linkType === key ? " active" : ""}`}
                  onClick={() => setLinkType(key)}>
                  <FontAwesomeIcon icon={icon} /> {label}
                </button>
              ))}
            </div>
            <label className="gd-modal-label">{linkType === "virtual" ? "Kuula Share or Post URL" : "URL"}</label>
            <input className="gd-edit-input"
              placeholder={linkType === "virtual" ? "https://kuula.co/post/xxxxx" : "https://..."}
              value={linkInput} onChange={(e) => setLinkInput(e.target.value)} autoFocus />
            <label className="gd-modal-label">Title (optional)</label>
            <input className="gd-edit-input" placeholder="e.g. Master Bedroom Virtual Tour"
              value={linkTitle} onChange={(e) => setLinkTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addLinkItem(linkModal.sectionId)} />
            {linkType === "virtual" && linkInput.includes("kuula.co") && (
              <p className="gd-modal-hint">✅ Kuula link detected — will embed as interactive 360° viewer.</p>
            )}
            <div className="gd-modal-actions">
              <button className="gd-done-btn" onClick={() => addLinkItem(linkModal.sectionId)}>
                <FontAwesomeIcon icon={faPlus} /> &nbsp;Add
              </button>
              <button className="gd-cancel-btn" onClick={() => setLinkModal(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Image / Video Lightbox */}
      {lightbox && (
        <div className="gd-lightbox" onClick={() => setLightbox(null)}>
          <button className="gd-lightbox-close" onClick={() => setLightbox(null)}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <div className="gd-lightbox-content" onClick={(e) => e.stopPropagation()}>
            {lightbox.type === "video"
              ? <video src={lightbox.src} controls autoPlay className="gd-lightbox-media" />
              : <img src={lightbox.src} alt={lightbox.title} className="gd-lightbox-media" />}
            {lightbox.title && <p className="gd-lightbox-title">{lightbox.title}</p>}
          </div>
        </div>
      )}
    </section>
  );
};

export default GraphicDesign;
