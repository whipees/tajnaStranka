document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Get the username and password values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    var id =0;
    // Fetch the hashed password from the JSON file
    fetch('users.json')
        .then(response => response.json())
        .then(data => {
            const user = data.users.find(user => user.username === username);
           
            if (user) {
                // Hash the entered password using SHA-256
                const hashedPassword = sha256(password);

                // Check if the hashed password matches the stored hashed password
                if (hashedPassword === user.password) {
                    // Redirect to Google after successful login
                    window.location.href = './web/stranka.html';
                  
                } else {
                    alert('Invalid username or password');
                }
            } else {
                alert('Invalid username or password');
            }
        })
        .catch(error => console.error('Error fetching users:', error));
});

// Function to hash password using SHA-256
function sha256(input) {
    return CryptoJS.SHA256(input).toString(CryptoJS.enc.Hex);
}