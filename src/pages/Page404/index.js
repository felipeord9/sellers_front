/* import Error from '../../assest/error-404.jpg' */
import Logo from '../../assest/logo-gran-langostino.png'
import './styles.css' 

export default function Page404() {
  return (
    <div className=" wrapper d-flex justify-content-center align-items-center vh-100 w-100 m-auto " style={{userSelect:'none'}}>
      <div className='rounder-4'>
      <div className='login-wrapper ' style={{backgroundColor:''}}>
      {/* <img src={Logo} alt=''/> */}
      <h1 className="error" >¡¡ERROR!!</h1>
      <center>
      <h2 className="text w-100 justify-content-center" >404 - page no found</h2>
      </center>
    </div>
    </div>
    </div>
  )
}