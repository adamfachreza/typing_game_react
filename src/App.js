import { useState, useEffect } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const levels = {
  easy: 5,
  medium: 10,
  hard: 1,
}

const currentLevel = levels.medium;

let time = levels.medium;


const words = [
  "nama",
  "kata",
  "kaki",
  "koki",
  "komputer",
  "laptop",
  "kipas",
  "sendok",
  "garpu",
  "baju",
  "celana",
  "kompor",
  "gelas",
  "piring",
];

function App() {
  const [keyKata,setKeyKata]= useState("");
  const [input, setinput] = useState("");
  const [timeS,setTimeS] = useState(time);
  const [bermain, setBermain] = useState(null);
  const [keterangan, setKeterangan] = useState("");
  const [skor, setSkor] = useState(0);
  const [show, setShow] = useState(false);
  const [skorTertinggi, setSkorTertingg] = useState(sessionStorage['hightscore']);

  // modal
  const handleClose = () => {
    setShow(false);
    time = currentLevel;
    setinput("");
    setSkor(0);
  };

  const handleShow = () => setShow(true);

  useEffect(() => {
    tampilKata(words)
    setInterval(hitungMundur , 1000);
  },[]);

  // acak kata
  const tampilKata = (words) => {
    const randomIndex = Math.floor(Math.random() * words.length);
    setKeyKata(words[randomIndex]);
  }

  useEffect(()=>{
    if(input === keyKata && input.length > 0){
      tampilKata(words);
      setinput("");
      setBermain(true)
      setKeterangan("Benar");
      time = currentLevel + 1;
      setTimeS(time);
      setSkor(data => data + 1);
    }
    if(typeof sessionStorage['hightscore'] === 'undefined' || skor > sessionStorage['hightscore']){
      sessionStorage['hightscore'] = skor;
    }
    if(sessionStorage['hightscore'] >= 0){
      setSkorTertingg(sessionStorage['hightscore'])
    }
  },[input])

  // hitung mundur
  const hitungMundur = () =>{
    if(time > 0){
      time--;
    }else if(time === 0){
      setBermain(false)
    }
    setTimeS(time);
  }
  // keterangan game 
  const cekStatus = () =>{
    if(!bermain && time === 0){
      setKeterangan("Game Over !")
      setShow(true);
    }
  }
  setInterval(cekStatus, 50);

  const heightSkor = () => {
    if(sessionStorage['hightscore'] != "undifinend"){
      sessionStorage['hightscore'] = 0;
      setSkorTertingg(0);
    }
  }

  return (
   <>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton={handleClose}>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body><h1 className='text-center'>{skor}</h1></Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={heightSkor}>
            Reset Skor Tertinggi
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Mulai
          </Button>
        </Modal.Footer>
      </Modal>


    <header className='text-center text-white p-e mb-5' style={{backgroundColor:'#77ACF1'}}>
      <h1><span>Typing Game </span></h1>
    </header>
    <div className='col-4'>
      <h3><span>Waktu: {time || timeS} </span></h3>
    </div>

    <div className='col-4'>
      <h3><span>Skor: {skor} </span></h3>
    </div>

    <div className='col-4'>
      <h3><span>Skor Tertinggi: {skorTertinggi} </span></h3>
    </div>

    <div className='container text-center col-md-8 col-6'>
      <div className='row'>
        <div className='col-md-6 mx-auto'>
          <h2 className='display-1 mb-5' style={{fontFamily:'sans-serif'}}>
            {keyKata}
          </h2>
          <input type="text" value={input} onChange={(e) => setinput(e.target.value)} className='form-control form-control-lg' placeholder='Ketik disini . . . .' />
          <h4 className='mt-3'>{keterangan}</h4>
          {/* <div className='row mt-5' style={{cursor:'pointer'}}>
            <div className='col-md-12'>
              <div onClick={() => heightSkor()} className='card card-body text-white' style={{backgroundColor:'#77ACF1'}}>
                <h5>RESET</h5>
                <p>Dengan Menekan Tombol Reset Anda Akan Menghapus History Skor Tertinggi</p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
   </>
  );
}

export default App;
