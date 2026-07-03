import { useState } from 'react';
import { ShieldAlert, CheckCircle, AlertTriangle, Loader2, ArrowRight, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function App() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch('http://localhost:8000/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) throw new Error('Failed to analyze URL');
      
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message || 'An error occurred during analysis.');
    } finally {
      setLoading(false);
    }
  };

  // Function to generate and download the PDF
  const generatePDF = () => {
    if (!results) return;

    const doc = new jsPDF();
    
    // Add Title and URL
    doc.setFontSize(20);
    doc.text('Accessibility Audit Report', 14, 22);
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text(`Target URL: ${results.url}`, 14, 30);
    doc.text(`Date Scanned: ${new Date().toLocaleDateString()}`, 14, 38);

    // Add Stats Summary
    doc.setTextColor(0);
    doc.text(`Total Violations Found: ${results.violations.length}`, 14, 50);
    doc.text(`Total Passed Checks: ${results.passes.length}`, 14, 58);

    // Prepare table data
    const tableColumn = ["Issue", "Impact", "WCAG Criteria", "Help URL"];
    const tableRows = [];

    results.violations.forEach(violation => {
      // Extract WCAG tags specifically
      const wcagTags = violation.tags
        .filter(tag => tag.startsWith('wcag'))
        .map(tag => tag.toUpperCase())
        .join(', ');

      const violationData = [
        violation.help,
        violation.impact.toUpperCase(),
        wcagTags || 'N/A',
        violation.helpUrl
      ];
      tableRows.push(violationData);
    });

    // Generate the table
    doc.autoTable({
      startY: 65,
      head: [tableColumn],
      body: tableRows,
      theme: 'grid',
      headStyles: { fillColor: [79, 70, 229] }, // Indigo-600 to match your UI
      styles: { fontSize: 10, cellPadding: 4 },
      columnStyles: {
        3: { cellWidth: 50, overflow: 'linebreak' } // Constrain URL column
      }
    });

    // Download the file
    doc.save(`a11y-report-${new Date().getTime()}.pdf`);
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'serious': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'minor': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen p-8 text-slate-800">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <header className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200">
              <ShieldAlert className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
            Axe-Core Accessibility Scanner
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Ensure your website is accessible to everyone. Enter a URL below to run an automated Axe-core audit powered by headless Chrome.
          </p>
        </header>

        {/* Search Bar */}
        <form onSubmit={handleAnalyze} className="max-w-2xl mx-auto mb-12">
          <div className="relative flex items-center shadow-sm rounded-xl overflow-hidden bg-white border border-slate-200 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-all">
            <input
              type="text"
              className="w-full py-4 pl-6 pr-32 outline-none text-slate-700 placeholder-slate-400"
              placeholder="e.g. example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !url}
              className="absolute right-2 top-2 bottom-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-6 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Scan Now'}
            </button>
          </div>
        </form>

        {/* Error State */}
        {error && (
          <div className="p-4 mb-8 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-3 max-w-2xl mx-auto">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <Loader2 className="w-10 h-10 animate-spin text-indigo-600 mx-auto mb-4" />
            <p className="text-slate-500 animate-pulse">Booting headless browser & scanning page...</p>
          </div>
        )}

        {/* Results Section */}
        {results && !loading && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* Header with Stats and Download Button */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex gap-8">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">Total Violations</p>
                  <p className="text-3xl font-bold text-red-600">{results.violations.length}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">Passed Checks</p>
                  <p className="text-3xl font-bold text-emerald-600">{results.passes.length}</p>
                </div>
              </div>
              
              <button 
                onClick={generatePDF}
                className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-xl font-medium transition-colors"
              >
                <Download className="w-4 h-4" />
                Download PDF Report
              </button>
            </div>

            {/* Violations List */}
            {results.violations.length > 0 ? (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900 border-b pb-4">Detailed Violations</h2>
                {results.violations.map((violation, idx) => {
                  
                  // Filter out only the WCAG tags
                  const wcagTags = violation.tags.filter(tag => tag.startsWith('wcag'));

                  return (
                    <div key={idx} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                          <div>
                            <h3 className="text-lg font-bold text-slate-900 mb-1">{violation.help}</h3>
                            <p className="text-sm text-slate-600 mb-3">{violation.description}</p>
                            
                            {/* Render WCAG Badges */}
                            {wcagTags.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {wcagTags.map(tag => (
                                  <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-bold uppercase tracking-wider border border-slate-200">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border whitespace-nowrap ${getImpactColor(violation.impact)}`}>
                            {violation.impact}
                          </span>
                        </div>
                        
                        <div className="mt-6">
                          <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4" /> Affected Elements ({violation.nodes.length})
                          </h4>
                          <div className="space-y-3">
                            {violation.nodes.slice(0, 5).map((node, nodeIdx) => (
                              <div key={nodeIdx} className="bg-slate-50 p-4 rounded-xl border border-slate-100 font-mono text-sm text-slate-700 overflow-x-auto">
                                {node.html}
                              </div>
                            ))}
                            {violation.nodes.length > 5 && (
                              <p className="text-sm text-slate-500 italic">+ {violation.nodes.length - 5} more elements</p>
                            )}
                          </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-slate-100">
                          <a href={violation.helpUrl} target="_blank" rel="noreferrer" className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors">
                            Learn how to fix this <ArrowRight className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center">
                <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-emerald-800 mb-2">Perfect! No Violations Found</h3>
                <p className="text-emerald-600">Axe-core did not detect any known accessibility violations on this page.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;