import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { IncomingForm } from 'formidable'
import fs from 'fs'
import path from 'path'

// ── Upload Handler Plugin ────────────────────────────────────────────────────
// Receives uploaded files and saves them to:
//   public/designs/<section-folder>/<filename>
// Served at: /designs/<section-folder>/<filename>
const uploadPlugin = {
  name: 'vite-upload-handler',
  configureServer(server) {
    server.middlewares.use('/api/upload', (req, res) => {
      if (req.method !== 'POST') {
        res.statusCode = 405
        res.end('Method not allowed')
        return
      }

      const form = new IncomingForm({
        keepExtensions: true,
        maxFileSize: 300 * 1024 * 1024, // 300 MB per file
        multiples: true,
      })

      form.parse(req, (err, fields, files) => {
        if (err) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: err.message }))
          return
        }

        // Section folder: supports nested paths like "taurgo/floor-plans"
        const rawId = Array.isArray(fields.sectionId)
          ? fields.sectionId[0]
          : fields.sectionId || 'general'
        // Split on / and sanitise each segment individually
        const segments = rawId.split('/').map((seg) =>
          seg.replace(/[^a-zA-Z0-9_-]/g, '-').toLowerCase()
        )
        const sectionFolder = segments.join('/')

        const destDir = path.resolve('public', 'designs', ...segments)
        fs.mkdirSync(destDir, { recursive: true })

        // files.files may be one object or an array
        const fileList = files.files
        const fileArray = fileList
          ? Array.isArray(fileList) ? fileList : [fileList]
          : []

        const savedFiles = []
        for (const file of fileArray) {
          if (!file) continue
          // Keep original filename; add timestamp prefix to avoid clashes
          const originalName = file.originalFilename || file.newFilename || 'upload'
          const safeName = `${Date.now()}_${originalName.replace(/[^a-zA-Z0-9._-]/g, '_')}`
          const destPath = path.join(destDir, safeName)
          try {
            fs.renameSync(file.filepath, destPath)
          } catch {
            fs.copyFileSync(file.filepath, destPath)
            fs.unlinkSync(file.filepath)
          }
          savedFiles.push({
            url: `/designs/${sectionFolder}/${safeName}`,
            filename: safeName,
            originalName,
            mimetype: file.mimetype || '',
          })
        }

        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ files: savedFiles }))
      })
    })
  },
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), uploadPlugin],
})
