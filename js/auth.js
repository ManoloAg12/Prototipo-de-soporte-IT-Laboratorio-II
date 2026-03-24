document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const userMete = document.getElementById('username').value;
    const passMete = document.getElementById('password').value;
    const errorMsg = document.getElementById('errorMessage');

    try {
        const response = await fetch('data/usuarios.json');
        const data = await response.json();

        const usuarioValido = data.usuarios.find(
            (u) => u.username === userMete && u.password === passMete
        );

        if (usuarioValido) {
            errorMsg.classList.add('hidden');
            sessionStorage.setItem('usuarioLogueado', usuarioValido.username);
            window.location.href = 'portal.html'; 
        } else {
            errorMsg.classList.remove('hidden');
        }
    } catch (error) {
        console.error("Error al cargar el JSON:", error);
        alert("Hubo un error de conexión con la base de datos simulada.");
    }
});