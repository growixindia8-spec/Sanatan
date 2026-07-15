import React, { useState, useEffect } from "react";
import { adminApi } from "../../lib/adminApiClient";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import AdminTable from "../../components/admin/AdminTable";
import AdminModal from "../../components/admin/AdminModal";
import StatusBadge from "../../components/admin/StatusBadge";
import LoadingState from "../../components/admin/LoadingState";
import ErrorState from "../../components/admin/ErrorState";
import { Edit2, ShieldCheck, RefreshCw, Eye } from "lucide-react";

export default function AdminContent() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Edit Modal State
  const [editOpen, setEditOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);

  // Form Fields
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [buttonUrl, setButtonUrl] = useState("");
  const [isPublished, setIsPublished] = useState(true);
  const [saving, setSaving] = useState(false);

  // Preview Mode
  const [previewMode, setPreviewMode] = useState(false);

  const fetchSections = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await adminApi.getContentSections();
      if (res.success) {
        setSections(res.sections);
      }
    } catch (err) {
      setError(err.message || "Failed to load site content sections.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  const handleOpenEdit = (sec) => {
    setSelectedSection(sec);
    setTitle(sec.title || "");
    setSubtitle(sec.subtitle || "");
    setDescription(sec.description || "");
    setContent(sec.content || "");
    setImageUrl(sec.imageUrl || "");
    setButtonText(sec.buttonText || "");
    setButtonUrl(sec.buttonUrl || "");
    setIsPublished(sec.isPublished !== undefined ? sec.isPublished : true);
    setPreviewMode(false);
    setEditOpen(true);
  };

  const handleReset = () => {
    if (!selectedSection) return;
    setTitle(selectedSection.title || "");
    setSubtitle(selectedSection.subtitle || "");
    setDescription(selectedSection.description || "");
    setContent(selectedSection.content || "");
    setImageUrl(selectedSection.imageUrl || "");
    setButtonText(selectedSection.buttonText || "");
    setButtonUrl(selectedSection.buttonUrl || "");
    setIsPublished(selectedSection.isPublished !== undefined ? selectedSection.isPublished : true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    
    // Security: Client-side XSS check
    const scriptRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
    if (
      scriptRegex.test(title) ||
      scriptRegex.test(subtitle) ||
      scriptRegex.test(description) ||
      scriptRegex.test(content)
    ) {
      alert("Security Violation: Executable script tags detected in text inputs. Action blocked.");
      return;
    }

    try {
      setSaving(true);
      const res = await adminApi.updateContentSection({
        sectionKey: selectedSection.sectionKey,
        title,
        subtitle,
        description,
        content,
        imageUrl,
        buttonText,
        buttonUrl,
        isPublished
      });
      if (res.success) {
        setEditOpen(false);
        fetchSections();
      }
    } catch (err) {
      alert("Failed to save changes: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Website Copy Content Management"
        description="Edit dynamic copy sections of the public website introduction panels, notices, and banners safely."
      />

      {loading ? (
        <LoadingState message="Connecting site copy registry..." />
      ) : error ? (
        <ErrorState error={error} onRetry={fetchSections} />
      ) : (
        <AdminTable headers={["Section Key / ID", "Section Title Preview", "Last Updated By", "Last Edited Date", "Visibility", "Actions"]}>
          {/* List required section keys if database is empty, mapping falls back to static definitions */}
          {["home-hero", "home-introduction", "home-announcement", "about-introduction", "contact-details", "donation-information", "footer-contact", "social-links", "why-choose-us", "homepage-notice"].map((key) => {
            const sec = sections.find((s) => s.sectionKey === key) || {
              sectionKey: key,
              title: `Default ${key.replace("-", " ")} Header`,
              isPublished: true
            };
            return (
              <tr key={key} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 font-mono font-bold text-gray-400 whitespace-nowrap">{key}</td>
                <td className="px-6 py-4 font-bold text-charcoal truncate max-w-[200px]">{sec.title || "Untitled Section"}</td>
                <td className="px-6 py-4 text-xs text-gray-500 whitespace-nowrap">{sec.updatedBy?.fullName || "System Static"}</td>
                <td className="px-6 py-4 text-xs text-gray-400 whitespace-nowrap">
                  {sec.updatedAt ? new Date(sec.updatedAt).toLocaleDateString() : "Default"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={sec.isPublished ? "active" : "closed"} />
                </td>
                <td className="px-6 py-4 text-right whitespace-nowrap">
                  <button
                    onClick={() => handleOpenEdit(sec)}
                    className="p-2 bg-gray-50 border border-gray-150 rounded-xl hover:border-orange-100 hover:text-[#FF6600] text-xs font-bold text-gray-600 transition-all flex items-center gap-1"
                  >
                    <Edit2 size={13} /> Edit Copy
                  </button>
                </td>
              </tr>
            );
          })}
        </AdminTable>
      )}

      {/* Editor Modal */}
      <AdminModal isOpen={editOpen} onClose={() => setEditOpen(false)} title={`Content Editor: ${selectedSection?.sectionKey}`}>
        {selectedSection && (
          <div className="space-y-6">
            <div className="flex border-b border-gray-100 gap-2 mb-4">
              <button
                type="button"
                onClick={() => setPreviewMode(false)}
                className={`py-2 px-4 font-bold text-xs uppercase tracking-wider border-b-2 transition-all ${
                  !previewMode ? "border-[#FF6600] text-[#FF6600]" : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
              >
                Form Editor
              </button>
              <button
                type="button"
                onClick={() => setPreviewMode(true)}
                className={`py-2 px-4 font-bold text-xs uppercase tracking-wider border-b-2 transition-all ${
                  previewMode ? "border-[#FF6600] text-[#FF6600]" : "border-transparent text-gray-400 hover:text-gray-600"
                }`}
              >
                Live Preview
              </button>
            </div>

            {!previewMode ? (
              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-1">Headline / Title</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6600] text-xs font-semibold text-charcoal bg-white"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-1">Sub-headline / Subtitle</label>
                    <input
                      type="text"
                      value={subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6600] text-xs font-semibold text-charcoal bg-white"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-1">Short Description</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6600] text-xs font-semibold text-charcoal bg-white"
                      rows={3}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-1">Detailed Content Paragraphs</label>
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6600] text-xs font-semibold text-charcoal bg-white"
                      rows={6}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-1">Illustration / Image URL</label>
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://..."
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6600] text-xs font-semibold text-charcoal bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-1">Action Button Text</label>
                    <input
                      type="text"
                      value={buttonText}
                      onChange={(e) => setButtonText(e.target.value)}
                      placeholder="e.g. Donate Now"
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6600] text-xs font-semibold text-charcoal bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold text-gray-500 uppercase tracking-widest mb-1">Action Button URL Redirect</label>
                    <input
                      type="text"
                      value={buttonUrl}
                      onChange={(e) => setButtonUrl(e.target.value)}
                      placeholder="e.g. /donate"
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6600] text-xs font-semibold text-charcoal bg-white"
                    />
                  </div>
                  <div className="flex items-center pt-4">
                    <label className="flex items-center gap-2 text-xs font-bold text-gray-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isPublished}
                        onChange={(e) => setIsPublished(e.target.checked)}
                        className="rounded text-[#FF6600] focus:ring-[#FF6600]"
                      />
                      Make copy blocks visible to visitors immediately
                    </label>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-gray-100 mt-6">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-4 py-2 bg-gray-50 border border-gray-200 text-gray-600 rounded-xl text-xs font-bold hover:bg-gray-100 flex items-center gap-1.5"
                  >
                    <RefreshCw size={12} /> Reset Changes
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2 bg-charcoal text-white rounded-xl text-xs font-bold hover:bg-gray-800 disabled:opacity-50"
                  >
                    {saving ? "Publishing..." : "Publish Section"}
                  </button>
                </div>
              </form>
            ) : (
              /* Preview Mode */
              <div className="bg-gray-550/10 border border-gray-200 p-6 rounded-2xl space-y-4">
                <div className="flex items-center gap-2 border-b border-gray-150 pb-3 text-emerald-700 text-[10px] font-extrabold uppercase">
                  <ShieldCheck size={14} /> Sandbox Content Sanitized Safe View
                </div>
                
                {imageUrl && (
                  <img src={imageUrl} alt="Copy Header Representation" className="max-h-48 rounded-xl object-cover" />
                )}
                <div>
                  <h1 className="text-lg font-serif font-black text-charcoal">{title || "Untitled Heading"}</h1>
                  {subtitle && <p className="text-gray-400 text-xs mt-0.5">{subtitle}</p>}
                </div>
                {description && <p className="text-gray-500 text-xs leading-relaxed italic">{description}</p>}
                {content && <p className="text-gray-600 text-xs leading-relaxed whitespace-pre-wrap">{content}</p>}
                
                {buttonText && (
                  <button type="button" className="bg-[#FF6600] text-white font-bold py-2 px-6 rounded-xl text-xs shadow-sm hover:bg-orange-600">
                    {buttonText}
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </AdminModal>
    </div>
  );
}
