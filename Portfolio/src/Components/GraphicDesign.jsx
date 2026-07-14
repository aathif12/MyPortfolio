import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExpand, faTimes, faVideo,
  faChevronDown, faChevronUp,
  faLink, faVrCardboard, faImage,
  faDraftingCompass, faFilter, faPalette, faCamera,
  faBullhorn, faBuilding, faPaintBrush
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
const SECTION_CONFIGS = {
  "parliament-election-2025": {
    badgeText: "Campaign",
    badgeIcon: faBullhorn,
    accentColor: "#f4d259",
    description: "2 designers worked together as a digital marketing team for Kader Mastan (full name K. Kader Mastan), a prominent Sri Lankan politician and Member of Parliament (MP) representing the Vanni Electoral District. He successfully won the election in 2025.",
    uploadTypes: [
      { key: "poster", folder: "posters" },
      { key: "image",  folder: "2d-photos" },
      { key: "video",  folder: "videos" },
    ],
    filterKeys: ["all", "poster", "image", "video"],
  },
  "local-election-2025": {
    badgeText: "Campaign",
    badgeIcon: faBullhorn,
    accentColor: "#f4d259",
    description: "Worked for him and his party, the Sri Lanka Labour Party, during the local elections.",
    uploadTypes: [
      { key: "poster", folder: "posters" },
      { key: "image",  folder: "2d-photos" },
      { key: "video",  folder: "videos" },
    ],
    filterKeys: ["all", "poster", "image", "video"],
  },
  "taurgo": {
    badgeText: "Taurgo",
    badgeIcon: faBuilding,
    accentColor: "#c47ef4",
    description: "Worked as a part-time Designer at Taurgo from Aug 2025 to present. Created Virtual Tours, edited 2D photos, and designed Floor Plans.",
    uploadTypes: [
      { key: "floorplan", folder: "floor-plans" },
      { key: "image",     folder: "2d-photos" },
      { key: "virtual",   folder: null },
    ],
    filterKeys: ["all", "floorplan", "image", "virtual"],
  },
  "freelanced-posters-design": {
    badgeText: "Freelance",
    badgeIcon: faPaintBrush,
    accentColor: "#5aac7a",
    description: "Various freelance poster designs and related media.",
    uploadTypes: [
      { key: "poster", folder: "posters" },
      { key: "image",  folder: "2d-photos" },
      { key: "video",  folder: "videos" },
    ],
    filterKeys: ["all", "poster", "image", "video"],
  },
};

// ── Default sections ──────────────────────────────────────────────────────────
const DEFAULT_SECTIONS = [
  { id: "parliament-election-2025", title: "Parliament Election Campaign 2025", items: [] },
  { id: "local-election-2025",      title: "Local Election 2025",               items: [] },
  { id: "taurgo",                   title: "Taurgo",                            items: [] },
  { id: "freelanced-posters-design",title: "Freelanced Posters Design",         items: [] },
];

// ── localStorage helpers ──────────────────────────────────────────────────────
const loadSections = () => {
  try {
    let r = localStorage.getItem(STORAGE_KEY);
    if (!r) {
      r = localStorage.getItem("gd_sections_meta_v4") || 
          localStorage.getItem("gd_sections_meta_v3") || 
          localStorage.getItem("gd_design_sections_v2");
    }
    if (r) {
      const parsed = JSON.parse(r);
      const existingIds = new Set(parsed.map((s) => s.id));
      const missingDefaults = DEFAULT_SECTIONS.filter((ds) => !existingIds.has(ds.id));
      return [...parsed, ...missingDefaults];
    }
  } catch {}
  return DEFAULT_SECTIONS;
};

const saveSections = (s) => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch {} };

// ─────────────────────────────────────────────────────────────────────────────
const GraphicDesign = () => {
  const [sections, setSections]   = useState(loadSections);
  const [lightbox, setLightbox]   = useState(null);
  const [collapsed, setCollapsed] = useState({});
  const [sectionFilters, setSectionFilters] = useState({});

  useEffect(() => { saveSections(sections); }, [sections]);

  const getFilter = (secId) => sectionFilters[secId] || "all";
  const setFilter = (secId, key) => setSectionFilters((p) => ({ ...p, [secId]: key }));

  // ── Sync from Disk ────────────────────────────────────────────────────────
  const syncFromDisk = async () => {
    try {
      const res = await fetch("/api/scan");
      if (!res.ok) return;
      const data = await res.json();
      if (!data.files || !data.files.length) return;

      setSections((prev) => {
        let updated = false;
        const newSections = prev.map((s) => {
          let newItems = [...s.items];
          const sectionFiles = data.files.filter((f) => f.url.startsWith(`/designs/${s.id}/`));
          
          for (const f of sectionFiles) {
            if (!newItems.find((i) => i.src === f.url || i.savedPath === f.url)) {
              updated = true;
              let itemType = f.type;
              const config = SECTION_CONFIGS[s.id];
              if (config && config.uploadTypes) {
                const subFolderMatch = f.url.split(`/designs/${s.id}/`)[1]?.split("/")[0];
                const matchedType = config.uploadTypes.find((t) => t.folder === subFolderMatch);
                if (matchedType) itemType = matchedType.key;
              }

              newItems.push({
                id: `item-sync-${Date.now()}-${Math.random().toString(36).slice(2)}`,
                src: f.url,
                type: itemType,
                title: f.filename.replace(/\.[^/.]+$/, ""),
                desc: "",
                savedPath: f.url,
              });
            }
          }
          return { ...s, items: newItems };
        });
        return updated ? newSections : prev;
      });
    } catch (err) {
      console.warn("Disk sync failed:", err);
    }
  };

  useEffect(() => {
    syncFromDisk();
  }, []);

  const toggleCollapse = (id) => setCollapsed((p) => ({ ...p, [id]: !p[id] }));

  // ── Render one card ───────────────────────────────────────────────────────
  const renderCard = (item) => {
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
          <h4 className="gd-card-title">{item.title || "Untitled"}</h4>
          {item.desc && <p className="gd-card-desc">{item.desc}</p>}
          {(isVirtual || isLink) && (
            <div className="gd-card-actions">
              <a href={item.originalUrl || item.src} target="_blank" rel="noopener noreferrer"
                className="gd-action-btn" title="Open link">
                <FontAwesomeIcon icon={faLink} /> Open Link
              </a>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ── Generic config-driven sub-typed section ───────────────────────────────
  const renderSubtypedSection = (sec) => {
    const config      = SECTION_CONFIGS[sec.id] || {};
    const isCollapsed = collapsed[sec.id] !== false;
    const activeFilter = getFilter(sec.id);

    const filterKeys  = config.filterKeys || ["all"];
    const accentColor = config.accentColor || "#59b2f4";
    const badge       = config.badge || null;
    const description = config.description || null;

    // Counts per type
    const counts = { all: sec.items.length };
    filterKeys.forEach((k) => {
      if (k !== "all") counts[k] = sec.items.filter((i) => i.type === k).length;
    });

    // Filtered items
    const filteredItems = activeFilter === "all"
      ? sec.items
      : sec.items.filter((i) => i.type === activeFilter);

    // Hide entirely if empty (optional: or show an empty state, but since it's a portfolio, hiding is cleaner)
    // We'll just show the header and "No items" to be safe.
    if (sec.items.length === 0) return null;

    return (
      <div className="gd-section gd-section-typed" key={sec.id} style={{ "--section-accent": accentColor }}>
        {/* Section Header */}
        <div 
          className="gd-section-header" 
          style={{ borderBottomColor: accentColor + "30", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "flex-start", paddingBottom: "1.2rem" }}
          onClick={() => toggleCollapse(sec.id)}
        >
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
            <div className="gd-section-title-row">
              {config.badgeText && (
                <span className="gd-section-badge" style={{ background: accentColor + "20", color: accentColor, borderColor: accentColor + "50" }}>
                  {config.badgeIcon && <FontAwesomeIcon icon={config.badgeIcon} style={{ marginRight: "0.4rem" }} />}
                  {config.badgeText}
                </span>
              )}
              <h3 className="gd-section-title" style={{ color: accentColor }}>{sec.title}</h3>
              <span className="gd-section-count">{sec.items.length} item{sec.items.length !== 1 ? "s" : ""}</span>
            </div>
            <div className="gd-section-actions">
              <button className="gd-action-btn">
                <FontAwesomeIcon icon={isCollapsed ? faChevronDown : faChevronUp} />
              </button>
            </div>
          </div>

          <div className="gd-section-header-info" style={{ width: "100%", marginTop: "1rem" }}>
            {description && <p style={{ fontSize: "0.95rem", opacity: 0.85, marginBottom: isCollapsed ? "0.8rem" : "0", color: "var(--text-color)" }}>{description}</p>}
            {isCollapsed && (
              <p style={{ fontSize: "0.95rem", color: accentColor, fontWeight: 600, display: "flex", alignItems: "center", gap: "0.4rem" }}>
                Click here to view more <FontAwesomeIcon icon={faChevronDown} />
              </p>
            )}
          </div>
        </div>

        {!isCollapsed && (
          <>

            {/* ── Filter Tabs ── */}
            {sec.items.length > 0 && (
              <div className="gd-taurgo-filter-bar">
                {filterKeys.map((key) => {
                  if (counts[key] === 0 && key !== "all") return null; // Hide empty tabs
                  
                  const icon = key === "all" ? faFilter : (ITEM_TYPES[key]?.icon || faImage);
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

            {/* ── Grid ── */}
            <div className="gd-grid">
              {filteredItems.map((item) => renderCard(item))}
            </div>
          </>
        )}
      </div>
    );
  };

  // ── Main render ───────────────────────────────────────────────────────────
  return (
    <section className="graphic-design" id="graphic-design">
      <h2 className="heading">Design <span>Experience</span></h2>
      <p className="gd-subtitle">
        A curated showcase of my graphic design work — election campaigns, architectural plans & virtual tours.
      </p>

      {/* Render all sections */}
      {sections.map((sec) => renderSubtypedSection(sec))}

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
