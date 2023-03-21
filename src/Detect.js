export function detectInfo(text) {
    const phoneRegex =   /(?:\+94|0)?[ \-]?(\d{3}[ \-]?\d{2}[ \-]?\d{4})/g;
    const creditCardRegex = /(?:\d[ \-]?){13,16}\d/g;
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    
    let phoneNumbers = [];
    let creditCardNumbers = [];
    let emails = [];
    
    let match;
    while ((match = phoneRegex.exec(text))) {
      phoneNumbers.push(match[1].replace(/[ \-]/g, ''));
    }
    
    while ((match = creditCardRegex.exec(text))) {
      creditCardNumbers.push(match[0].replace(/[ \-]/g, ''));
    }
    
    while ((match = emailRegex.exec(text))) {
      emails.push(match[0]);
    }
    
    let output = '';
    if (phoneNumbers.length > 0) {
      output += `Potential Telephone numbers detected !!!: {${phoneNumbers.join(', ')}} \n`;
    }
    if (creditCardNumbers.length > 0) {
      output += `Potential Credit card numbers detected !!!: {${creditCardNumbers.join(', ')}} \n `;
    }
    if (emails.length > 0) {
      output += `Potential Email addresses detected !!!: {${emails.join(', ')}} \n `;
    }
    
    if (output === '') {
      output =null;
    }
    
    return output;
  }