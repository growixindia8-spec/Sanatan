import React, { useState, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, ExternalLink, Download, FileText, AlertCircle, Loader } from 'lucide-react';

export default function CertificatePreviewModal({ isOpen, onClose, certificate }) {
  const [zoom, setZoom] = useState(1);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Reset state when certificate changes
  useEffect(() => {
    setZoom(1);
    setHasError(false);
    
    if (!certificate || !certificate.document) {
      setHasError(true);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const docUrl = certificate.hideSensitiveDetails && certificate.redactedDocument
      ? certificate.redactedDocument
      : certificate.document;

    // Check if the document exists on the server
    fetch(docUrl, { method: 'HEAD' })
      .then((res) => {
        if (res.ok) {
          setHasError(false);
        } else {
          // Try a GET fallback in case HEAD is disallowed/not supported
          return fetch(docUrl);
        }
      })
      .then((res) => {
        if (res) {
          setHasError(!res.ok);
        }
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [certificate]);

  if (!isOpen || !certificate) return null;

  const docUrl = certificate.hideSensitiveDetails && certificate.redactedDocument
    ? certificate.redactedDocument
    : certificate.document;

  const isPdf = docUrl?.toLowerCase().endsWith('.pdf');

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.2, 3));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.2, 0.5));
  const handleResetZoom = () => setZoom(1);

  const handleDownload = (e) => {
    e.stopPropagation();
    // Trigger download using an anchor tag
    const link = document.createElement('a');
    link.href = docUrl;
    link.download = docUrl.split('/').pop() || 'certificate';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenNewTab = (e) => {
    e.stopPropagation();
    window.open(docUrl, '_blank');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm transition-opacity"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
    >
      {/* Modal Container */}
      <div 
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-white">
          <div>
            <h3 id="modal-title" className="text-xl font-bold font-devanagari text-charcoal">
              {certificate.title}
            </h3>
            <p className="text-xs text-gray-500 font-sans tracking-wider uppercase mt-0.5">
              {certificate.subtitle}
            </p>
          </div>
          <button 
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-full text-gray-400 hover:text-saffron hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Toolbar (Only show if document exists and is loaded successfully) */}
        {!hasError && !isLoading && (
          <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-3 bg-gray-50 border-b border-gray-100">
            {/* Zoom Controls (Images only) */}
            {!isPdf ? (
              <div className="flex items-center space-x-1">
                <button
                  type="button"
                  onClick={handleZoomIn}
                  title="Zoom In"
                  className="p-2 text-gray-600 hover:text-saffron hover:bg-white rounded-lg border border-transparent hover:border-gray-200 transition-all shadow-none hover:shadow-sm"
                >
                  <ZoomIn size={18} />
                </button>
                <button
                  type="button"
                  onClick={handleZoomOut}
                  title="Zoom Out"
                  className="p-2 text-gray-600 hover:text-saffron hover:bg-white rounded-lg border border-transparent hover:border-gray-200 transition-all shadow-none hover:shadow-sm"
                >
                  <ZoomOut size={18} />
                </button>
                <button
                  type="button"
                  onClick={handleResetZoom}
                  title="Reset Zoom"
                  className="p-2 text-gray-600 hover:text-saffron hover:bg-white rounded-lg border border-transparent hover:border-gray-200 transition-all shadow-none hover:shadow-sm"
                >
                  <RotateCcw size={18} />
                </button>
                <span className="text-xs text-gray-500 font-medium px-2">
                  {Math.round(zoom * 100)}%
                </span>
              </div>
            ) : (
              <div className="flex items-center text-xs text-gray-500 font-medium font-sans">
                <FileText size={16} className="text-saffron mr-2" />
                PDF Document
              </div>
            )}

            {/* Global Actions */}
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={handleOpenNewTab}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-gray-700 bg-white hover:bg-gray-100 border border-gray-200 rounded-xl transition-all shadow-sm"
              >
                <ExternalLink size={14} />
                Open in New Tab
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-saffron hover:bg-orange-600 rounded-xl transition-all shadow-sm shadow-orange-500/10"
              >
                <Download size={14} />
                Download
              </button>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="flex-grow overflow-auto bg-gray-100 flex items-center justify-center p-6 min-h-[350px]">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center text-gray-500">
              <Loader className="animate-spin text-saffron mb-3" size={32} />
              <p className="text-sm font-medium font-sans">Checking document availability...</p>
            </div>
          ) : hasError ? (
            <div className="flex flex-col items-center justify-center text-center max-w-sm p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-500 mb-4">
                <AlertCircle size={24} />
              </div>
              <h4 className="text-base font-bold text-charcoal mb-2">Document Unavailable</h4>
              <p className="text-xs text-gray-500 leading-relaxed font-sans">
                Certificate document will be uploaded soon.
              </p>
            </div>
          ) : isPdf ? (
            <div className="w-full h-[60vh] rounded-xl overflow-hidden border border-gray-200 bg-white">
              <iframe
                src={`${docUrl}#view=FitH`}
                title={`${certificate.title} PDF Preview`}
                className="w-full h-full border-none"
              />
            </div>
          ) : (
            <div className="w-full h-full max-h-[60vh] flex items-center justify-center overflow-auto rounded-xl">
              <div 
                className="transition-transform duration-200 ease-out flex items-center justify-center"
                style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
              >
                <img
                  src={docUrl}
                  alt={`${certificate.title} certificate preview`}
                  className="max-w-full max-h-[60vh] object-contain rounded-lg shadow-md bg-white border border-gray-200"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
