function ImageAppFooter({imageBackground, loggedUser, onChangeImage}) {
  loggedUser&&onChangeImage("img/undraw_transfer_money_re_6o1h.svg")
  return   <div className={loggedUser?'img_footer_container_logged' : 'img_footer_container'}>
    <img className='img_footer' src={imageBackground}></img>
</div>
 
}
export default ImageAppFooter;