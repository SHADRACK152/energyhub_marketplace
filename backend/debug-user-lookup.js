const { dbHelpers } = require('./database');

async function debugUserLookup() {
  const userId = '2';
  let actualUserEmail = 'customer@example.com';
  let actualUserName = 'Customer';
  
  console.log('Before lookup - actualUserEmail:', actualUserEmail);
  console.log('Before lookup - actualUserName:', actualUserName);
  
  if (userId && userId !== 'demo-user') {
    try {
      const user = await dbHelpers.get('SELECT email, name FROM users WHERE id = ?', [userId]);
      console.log('User lookup result:', user);
      if (user) {
        actualUserEmail = user.email || actualUserEmail;
        actualUserName = user.name || actualUserName;
      }
    } catch (userError) {
      console.log('Error:', userError.message);
    }
  }
  
  console.log('After lookup - actualUserEmail:', actualUserEmail);
  console.log('After lookup - actualUserName:', actualUserName);
  
  process.exit(0);
}

debugUserLookup();
