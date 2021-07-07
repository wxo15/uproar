const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

export default (emails) =>{
    // trim leading and trailing spaces
    // replace trailing comma using regex
    // split by comma
    // trim each element
    // filter using email regex, obtained from https://emailregex.com/
    
    const invalidEmails = 
        emails
        .trim()
        .replace(/(^,)|(,$)/g, "")
        .split(',')
        .map(email => email.trim())
        .filter(email => re.test(email) === false);

    if (invalidEmails.length){
        return `These emails are invalid: ${invalidEmails}`;
    }
    return
}