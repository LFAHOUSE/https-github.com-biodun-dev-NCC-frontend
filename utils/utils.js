 export const validateEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  export const validateName = (name) => {
    // Check if name is empty
    if (name === "") {
      return "*Name is required";
    }
    // Check if name is too short
    if (name.length < 3) {
      return "*Name must be at least 3 characters long";
    }
    // Check if name contains invalid characters
    const nameRegex = /^[a-zA-Z]+$/;
    if (!nameRegex.test(name)) {
      return "Name must only contain letters";
    }
    // If no errors, return null
    return null;
  };

  

