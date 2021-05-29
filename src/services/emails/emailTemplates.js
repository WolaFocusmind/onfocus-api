/* eslint-disable no-unused-vars */

const contactFormEmail = (name, email, phone, text) => (
  `
      De: ${name} - ${email} <br>
      Telf: ${phone} <br>
      Mensaje: ${text}
    `
);

const purchasedCoursesWithActivation = (email, purchase, link) => (
  `
      Hola, Bievenido a FocusMind.<br>
      Te haz registrado con el email: ${email}.<br>
      
      Haz comprado los siguientes cursos:<br>
      Cursos: ${purchase} <br><br>

      Debes activar tu cuenta con el siguiente link: <br>
      ${link} <br><br>

      Luego debes iniciar sesion con los siguientes datos:<br>
      usuario: ${email} <br>
      contraseña: focus12345 <br> <br>

      Debes cambiar tu contraseña inmediatamente luego del inicio de sesion. <br> <br>

      Atentamente,<br>
      FocusMind.
    `
);

const purchasedCoursesNoActivation = (email, purchase) => (
  `
      Gracias por registrarte en Digital Mind!
      Email: ${email}<br>
      Hola, Gracias por tu compra.<br><br>

      Haz comprado los siguientes cursos:<br>
      Cursos: ${purchase} <br><br>
      
      Ya estan disponibles en tu cuenta para empezarlos.<br><br>

      Atentamente,<br>
      FocusMind.
    `
);

const contactFormEmailEvent = () => (
  `
  <div
  style="margin: 0 auto; width: 100%; background-color: #03002b; color: white; height: 100%; font-family: Arial, Helvetica, sans-serif;">
  <img src="https://focus-test2.s3.amazonaws.com/header.png" alt="header" style="width: 100%;">

  <div style="padding: 3rem 5rem;">
      <p style="text-align: left">
      <h2>Gracias por registrarte en <strong> Digital Mind!</strong></h2><br><br>

      Nuestro evento en consultoría el 08 de Diciembre.<br><br>

      <h3>Recordá que debés conectarte 10 minutos antes porque en caso contrario no podrás acceder al evento.</h3>
      <br><br>

      <span style="color: #ff0c62">Aquí te dejamos el enlace:</span><br><br>
      <a href="https://youtu.be/OUrf_OfKpT4">Click Acá.</a><br><br><br>

      Cualquier consulta, no dudes en escribirnos!<br><br>
      <strong>Nos vemos en linea!</strong><br><br>
      </p>
  </div>
  <div style="margin: 0 auto; padding-top: 3rem; padding-bottom: 3rem;background-color: #ff0c62;">
      <p style="text-align: center">
          <img src="https://focus-test2.s3.amazonaws.com/logo-final+(1).png" alt="Digital Mind Logo" />
      <h4 style="text-align:center">Un evento de <img
              src="https://focus-test2.s3.amazonaws.com/focus-mind-tiny.png" alt="Digital Mind Logo" /></h4>
      <br>

      <div style="text-align:center">
          <a href="https://twitter.com/focusmindmkt"><img style="padding-right: 10px;" src="https://focus-test2.s3.amazonaws.com/twitter.png" alt="twitter" /></a>
          <a href="https://www.behance.net/focusmind"><img style="padding-right: 10px;" src="https://focus-test2.s3.amazonaws.com/behance.png" alt="Behance"/></a>
          <a href="https://www.facebook.com/focusmindco/"><img style="padding-right: 10px;" src="https://focus-test2.s3.amazonaws.com/facebook.png" alt="Facebook" /></a>
          <a href="https://open.spotify.com/user/21eoh7kmmqsoe3dp4gda2lcsi?si=yXXMs8YnQSKHU84e9D7piQ"><img style="padding-right: 10px;" src="https://focus-test2.s3.amazonaws.com/spotify.png" alt="spotify" /></a>
          <a href="https://vimeo.com/focusmindmkt"><img style="padding-right: 10px;" src="https://focus-test2.s3.amazonaws.com/vimeo.png" alt="vimeo" /></a>
          <a href="https://www.instagram.com/focusmindmkt/"><img style="padding-right: 10px;" src="https://focus-test2.s3.amazonaws.com/instagram.png" alt="Instagram" /></a>
      </div>
      </p>

  </div>
</div>
    `
);
  
module.exports = {
  contactFormEmail,
  contactFormEmailEvent,
  purchasedCoursesWithActivation,
  purchasedCoursesNoActivation,
};
