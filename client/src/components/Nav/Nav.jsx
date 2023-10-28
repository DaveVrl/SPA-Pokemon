// import style from "./Nav.module.css";
// import logo from "../assets/logo.svg";
// import { useNavigate, useLocation } from "react-router-dom";

// const Nav = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   if (location.pathname === "/") {
//     return null; // No renderizar nada cuando la ubicación sea "/"
//   }

//   const goToHome = () => {
//     // Navegar a la ruta "/home"
//     navigate("/home");
//     // Desplazar la ventana al principio de la página
//     window.scrollTo(0, 0);
//   };

//   return (
//     <div className={style.container}>
//       <button
//         onClick={goToHome}
//         className={`${style.btn} ${
//           location.pathname === "/home" ? style.hidden : ""
//         }`}
//       >
//         Home
//       </button>

//       <img
//         onDoubleClick={() => navigate("/")}
//         className={style.img}
//         src={logo}
//         alt="#"
//       />

//       <button
//         onClick={() => navigate("/form")}
//         className={`${style.btn2} ${
//           location.pathname === "/form" ? style.hidden : ""
//         }`}
//       >
//         Create Pokémon
//       </button>
//     </div>
//   );
// };

// export default Nav;

import style from "./Nav.module.css";
import logo from "../assets/logo.svg";
import { useNavigate, useLocation } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === "/") {
    return null; // No renderizar nada cuando la ubicación sea "/"
  }

  const isMobile = window.innerWidth <= 767; // Definir el punto de quiebre aquí

  const goToHome = () => {
    // Navegar a la ruta "/home"
    navigate("/home");
    // Desplazar la ventana al principio de la página
    window.scrollTo(0, 0);
  };

  return (
    <div className={style.container}>
      <button
        onClick={goToHome}
        className={`${style.btn} ${
          location.pathname === "/home" ? style.hidden : ""
        }`}
      >
        Home
      </button>

      <img
        onDoubleClick={() => navigate("/")}
        className={style.img}
        src={logo}
        alt="#"
      />

      {isMobile && /^\/detail\/\d+$/.test(location.pathname) ? null : (
        <button
          onClick={() => navigate("/form")}
          className={`${style.btn2} ${
            location.pathname === "/form" ? style.hidden : ""
          }`}
        >
          Create Pokémon
        </button>
      )}
    </div>
  );
};

export default Nav;