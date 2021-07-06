const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

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