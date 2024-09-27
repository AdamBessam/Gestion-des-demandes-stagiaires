// /* eslint-disable jsx-a11y/click-events-have-key-events */
// /* eslint-disable jsx-a11y/no-static-element-interactions */
// /* eslint-disable prettier/prettier */
// import React, { useEffect, useState ,useRef} from 'react';
// import { Link } from 'react-router-dom';
// // const token = localStorage.getItem('TOKEN');
// const userRole = localStorage.getItem('USER_ROLE');
// // const userId = localStorage.getItem('USER_ID');

// // const isAuthenticated = token && userRole && userId;
// // const isAdmin = userRole === 'admin';
// const isProf = userRole === 'Professeurs';

// const Header = () => {
//   const [isBottom, setIsBottom] = useState(false);

//   useEffect(() => {
//     // Get the header element
//     const header = document.querySelector('.site-navbar');

//     // Function to toggle the 'sticky' class based on scroll position
//     const handleScroll = () => {
//       const scrollPosition = window.pageYOffset;


//       if (scrollPosition > 100) {
//         header.classList.add('sticky');
//         setIsBottom(true);
//       } else {
//         header.classList.remove('sticky');
//         setIsBottom(false);
//       }

//       // Check if scrolled to the bottom

//     };

//     // Attach the scroll event listener
//     window.addEventListener('scroll', handleScroll);

//     // Remove the scroll event listener on component unmount
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   const closeOnOutsideClick = (event) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//       setIsOpen(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener('mousedown', closeOnOutsideClick);
//     return () => {
//       document.removeEventListener('mousedown', closeOnOutsideClick);
//     };
//   }, []);



//   return (
//     <header className="site-navbar js-sticky-header site-navbar-target" role="banner">
//       <div className="container">
//         <div className="row align-items-center">
//           <div className="col-6 col-lg-2">
//             <h1 className="mb-0 site-logo">
//               <Link to="/" className={`mb-0 ${isBottom ? 'black-title' : ''}`}>AbesSystem</Link>
//             </h1>
//           </div>
//           <div className="col-12 col-md-10 d-none d-lg-block">
//             <nav className="site-navigation position-relative text-right" role="navigation">
//               <ul className=" site-menu main-menu js-clone-nav mr-auto d-none d-lg-block">
//                 {!isProf && (
//                   <>
//                     <li><a href="#propre" className="nav-link" style={{ color: isBottom ? 'black' : 'white' }}>à propos de</a></li>
//                     <li><a href="#services" className="nav-link" style={{ color: isBottom ? 'black' : 'white' }}>Services</a></li>
//                     <li><Link to="/login" className="nav-link" style={{ color: isBottom ? 'black' : 'white' }}>Connexion</Link></li>
//                   </>
//                 )}
//                 {isProf && (
//                   <>
//                     <li className="nav-item" style={{ position: 'relative' }}>
//   <button
//     className="nav-link"
//     style={{ color: isBottom? 'black' : 'white' }}
//     onClick={toggleDropdown}
//   >
//     Filière <i className="icofont icofont-arrow-down" style={{ marginRight: '5px' }}></i>
//   </button>
//   {isOpen && (
//     <div ref={dropdownRef} style={{ position: 'absolute', top: '100%', left: 0, zIndex: 100, backgroundColor: 'white', padding: '5px', borderRadius: '4px', boxShadow: '0 0 5px rgba(0,0,0,0.2)' }}>
//       <a href="#" style={{ display: 'block', textDecoration: 'none', color: 'black', padding: '5px 10px' }}>2ITE</a>
//       <a href="#" style={{ display: 'block', textDecoration: 'none', color: 'black', padding: '5px 10px' }}>Isic</a>
//       {isOpen && (
//         <div style={{ position: 'absolute', top: '100%', left: 0, zIndex: 100, backgroundColor: 'white', padding: '5px', borderRadius: '4px', boxShadow: '0 0 5px rgba(0,0,0,0.2)' }}>
//           {/* Nested dropdown content for 2ITE */}
//           <a href="#" style={{ display: 'block', textDecoration: 'none', color: 'black', padding: '5px 10px' }}>Nested Option 1</a>
//           <a href="#" style={{ display: 'block', textDecoration: 'none', color: 'black', padding: '5px 10px' }}>Nested Option 2</a>
//         </div>
//       )}
//       {isOpen && (
//         <div style={{ position: 'absolute', top: '100%', left: 0, zIndex: 100, backgroundColor: 'white', padding: '5px', borderRadius: '4px', boxShadow: '0 0 5px rgba(0,0,0,0.2)' }}>
//           {/* Nested dropdown content for Isic */}
//           <a href="#" style={{ display: 'block', textDecoration: 'none', color: 'black', padding: '5px 10px' }}>Nested Option 1</a>
//           <a href="#" style={{ display: 'block', textDecoration: 'none', color: 'black', padding: '5px 10px' }}>Nested Option 2</a>
//         </div>
//       )}
//     </div>
//   )}
// </li>
//                     <li><Link to="/profile" className="nav-link" style={{ color: isBottom ? 'black' : 'white' }}>Profile</Link></li>
//                     <li><Link to="/logout" className="nav-link" style={{ color: isBottom ? 'black' : 'white' }}>Log out</Link></li>

//                   </>
//                 )}
//               </ul>
//             </nav>
//           </div>
//           <div className="col-6 d-inline-block d-lg-none ml-md-0 py-3" style={{ position: 'relative', top: 3 }}>
//             <a href="#" className="burger site-menu-toggle js-menu-toggle" data-toggle="collapse" data-target="#main-navbar">
//               <span />
//             </a>
//           </div>
//         </div>
//       </div>
//     </header>

//   );
// };

// export default Header;
