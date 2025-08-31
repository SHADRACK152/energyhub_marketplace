import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const BulkUploadModal = ({ isOpen, onClose, onUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [validationResults, setValidationResults] = useState(null);

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === "dragenter" || e?.type === "dragover") {
      setDragActive(true);
    } else if (e?.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleFile(e?.dataTransfer?.files?.[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e?.target?.files && e?.target?.files?.[0]) {
      handleFile(e?.target?.files?.[0]);
    }
  };

  const handleFile = (file) => {
    if (file?.type === 'text/csv' || file?.name?.endsWith('.csv')) {
      setUploadedFile(file);
      // Mock validation results
      setValidationResults({
        totalRows: 150,
        validRows: 145,
        errors: [
          { row: 23, field: 'price', message: 'Invalid price format' },
          { row: 67, field: 'sku', message: 'SKU already exists' },
          { row: 89, field: 'category', message: 'Invalid category' },
          { row: 112, field: 'stock', message: 'Stock must be a number' },
          { row: 134, field: 'name', message: 'Product name is required' }
        ]
      });
    } else {
      alert('Please upload a CSV file');
    }
  };

  const handleUpload = () => {
    if (uploadedFile && validationResults) {
      onUpload(uploadedFile, validationResults);
      onClose();
      setUploadedFile(null);
      setValidationResults(null);
    }
  };

  const downloadTemplate = () => {
    // Mock CSV template download
    const csvContent = `name,brand,sku,category,description,price,stock,power,voltage,efficiency,warranty,dimensions,weight,status
"Solar Panel 400W","SolarTech","ST-400-2024","solar-panels","High efficiency monocrystalline solar panel",299.99,100,400,24,22.1,25,"2108×1048×40mm",22.5,active "Lithium Battery 100Ah","PowerStore","PS-100-LFP","batteries","LiFePO4 battery with BMS",899.99,50,1280,12.8,95,10,"330×173×220mm",13.5,active`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL?.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'product_template.csv';
    a?.click();
    window.URL?.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Bulk Upload Products</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {!uploadedFile ? (
            <div className="space-y-6">
              {/* Template Download */}
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Icon name="Download" size={20} className="text-primary mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground mb-1">Download Template</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Start with our CSV template to ensure proper formatting
                    </p>
                    <Button variant="outline" size="sm" onClick={downloadTemplate}>
                      Download CSV Template
                    </Button>
                  </div>
                </div>
              </div>

              {/* Upload Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-smooth ${
                  dragActive ? 'border-primary bg-primary/5' : 'border-border'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Icon name="Upload" size={48} className="mx-auto text-muted-foreground mb-4" />
                <h4 className="text-lg font-medium text-foreground mb-2">Upload CSV File</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Drag and drop your CSV file here, or click to browse
                </p>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileInput}
                  className="hidden"
                  id="csv-upload"
                />
                <label htmlFor="csv-upload">
                  <Button variant="outline" asChild>
                    <span>Choose CSV File</span>
                  </Button>
                </label>
              </div>

              {/* Instructions */}
              <div className="space-y-3">
                <h4 className="font-medium text-foreground">Upload Instructions:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Use the provided CSV template for best results</li>
                  <li>• Ensure all required fields are filled (name, sku, category, price, stock)</li>
                  <li>• SKUs must be unique across your inventory</li>
                  <li>• Price should be in USD format (e.g., 299.99)</li>
                  <li>• Stock should be a whole number</li>
                  <li>• Maximum file size: 10MB</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* File Info */}
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <Icon name="FileText" size={20} className="text-primary" />
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{uploadedFile?.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {(uploadedFile?.size / 1024)?.toFixed(1)} KB
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setUploadedFile(null);
                      setValidationResults(null);
                    }}
                  >
                    <Icon name="X" size={16} />
                  </Button>
                </div>
              </div>

              {/* Validation Results */}
              {validationResults && (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-muted/30 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-foreground">
                        {validationResults?.totalRows}
                      </div>
                      <div className="text-sm text-muted-foreground">Total Rows</div>
                    </div>
                    <div className="bg-success/10 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-success">
                        {validationResults?.validRows}
                      </div>
                      <div className="text-sm text-muted-foreground">Valid Rows</div>
                    </div>
                    <div className="bg-error/10 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-error">
                        {validationResults?.errors?.length}
                      </div>
                      <div className="text-sm text-muted-foreground">Errors</div>
                    </div>
                  </div>

                  {validationResults?.errors?.length > 0 && (
                    <div>
                      <h4 className="font-medium text-foreground mb-3">Validation Errors:</h4>
                      <div className="bg-error/5 border border-error/20 rounded-lg p-4 max-h-40 overflow-y-auto">
                        <div className="space-y-2">
                          {validationResults?.errors?.map((error, index) => (
                            <div key={index} className="text-sm">
                              <span className="font-medium text-error">Row {error?.row}:</span>
                              <span className="text-muted-foreground ml-2">
                                {error?.field} - {error?.message}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Fix these errors in your CSV file and re-upload, or proceed to import valid rows only.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          {uploadedFile && validationResults && (
            <Button 
              variant="default" 
              onClick={handleUpload}
              disabled={validationResults?.validRows === 0}
            >
              Import {validationResults?.validRows} Products
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BulkUploadModal;