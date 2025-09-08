const FormData = require('form-data');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

async function testProductCreation() {
  console.log('🧪 Testing product creation API...');
  
  try {
    const formData = new FormData();
    
    // Add basic product data
    formData.append('name', 'Test Solar Panel');
    formData.append('brand', 'TestBrand');
    formData.append('sku', 'TEST-001');
    formData.append('category', 'solar-panels');
    formData.append('description', 'Test product for schema validation');
    formData.append('status', 'active');
    formData.append('featured', 'false');
    
    // Add JSON fields
    formData.append('specifications', JSON.stringify({
      power: '400W',
      voltage: '24V',
      efficiency: '22%'
    }));
    
    formData.append('pricing', JSON.stringify({
      basePrice: '299.99'
    }));
    
    formData.append('inventory', JSON.stringify({
      stock: '100',
      lowStockThreshold: '10'
    }));

    console.log('📤 Sending test product creation request...');
    
    const response = await fetch('http://localhost:5000/api/products', {
      method: 'POST',
      body: formData
    });

    const result = await response.text();
    
    console.log('📥 Response status:', response.status);
    console.log('📥 Response:', result);
    
    if (response.ok) {
      console.log('✅ Product creation test PASSED!');
      console.log('🎉 Database schema is working correctly!');
    } else {
      console.log('❌ Product creation test FAILED!');
      console.log('Error details:', result);
    }
    
  } catch (error) {
    console.log('❌ Test error:', error.message);
  }
}

testProductCreation();
