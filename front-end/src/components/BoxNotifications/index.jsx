import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';

function ModalBoxNotifications(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div id="asidecontainer" className="d-none d-md-block col-md-4 position-md-fixed h-100">
            <aside className="rounded position-absolute aside-position aside-width aside-md-position
                          aside-md-width shadow h-50">
              
                <ul className="nav nav-tabs font-text tabs-container-size" id="myTab" role="tablist">
                  <li className="nav-item w-50 color-1 rounded border-0" role="presentation">
                    <Link id="top-liked-posts-tab" className="nav-link active d-flex justify-content-center" data-bs-toggle="tab" to="#top-liked-posts"
                        role="tab" aria-controls="top-liked-posts" aria-selected="true">
                      <h2 className="fs-6 text-light ">Populaires</h2>
                      <span className="material-icons mx-1 text-light">favorite</span>
                    </Link>
                  </li>
                  <li className="nav-item w-50 color-1 rounded border-0" role="presentation">
                    <Link className="nav-link d-flex justify-content-center" id="last-posts-list-tab" data-bs-toggle="tab" to="#last-posts-list"
                        role="tab" aria-controls="last-postsza-list" aria-selected="false">
                      <h2 className="fs-6 text-light">Nouveaux</h2>
                      <span className="material-icons mx-1 text-light">chat</span>
                      <span className="material-icons text-danger d-none">record_voice_over</span>
                    </Link>
                  </li>
                </ul>

                <div className="tab-content h-100 overflow-auto" id="myTabContent">
                  <div className="tab-pane fade show active border border-secondary border-2 rounded-3 color-4"
                       id="top-liked-posts" role="tabpanel" aria-labelledby="top-liked-posts-tab">
                    
                    <div className="list-group"> 
                      
                      <Link className="list-group-item-action text-decoration-none text-dark d-flex px-0 border border-dark px-1" to="#">
                        <div className="rounded-circle item-label-avatar-container color-4 mx-1 my-auto d-flex">
                          <img alt="user account icon" src="../icons/round_account_circle_black_24dp.png" className="w-100 align-middle"/>
                        </div>
                        <div className="">
                          <h2 className="my-0 font-aside fs-5 d-none d-lg-block bg-secondary text-light mx-1 mt-2 py-1 px-2 rounded">Wolfgang Amadeus</h2>
                          <p className="my-0 font-aside fs-6 my-2 mx-1">Lorem ipsum dolor sit amet, consectetur adipiscing</p>
                        </div>
                        <div className="d-flex flex-column justify-content-center bg-secondary rounded m-2 mx-auto px-2">
                          <div className="d-flex">
                            <span className="material-icons mx-1 text-dark">favorite</span>
                            <span className="font-aside mx-1 text-light">45</span>
                          </div>
                          <div className="d-flex">
                            <span className="material-icons mx-1">question_answer</span>
                            <span className="font-aside mx-1 text-light">14</span>
                          </div>
                        </div>
                      </Link>
                      <Link className="list-group-item-action text-decoration-none text-dark d-flex px-0 border border-dark px-1" to="#">
                        <div className="rounded-circle item-label-avatar-container color-4 mx-1 my-auto d-flex">
                          <img alt="user account icon" src="../icons/round_account_circle_black_24dp.png" className="w-100 align-middle"/>
                        </div>
                        <div className="">
                          <h2 className="my-0 font-aside fs-5 d-none d-lg-block bg-secondary text-light mx-1 mt-2 py-1 px-2 rounded">Wolfgang Amadeus</h2>
                          <p className="my-0 font-aside fs-6 my-2 mx-1">Lorem ipsum dolor sit amet, consectetur adipiscing</p>
                        </div>
                        <div className="d-flex flex-column justify-content-center bg-secondary rounded m-2 mx-auto px-2">
                          <div className="d-flex">
                            <span className="material-icons mx-1 text-dark">favorite</span>
                            <span className="font-aside mx-1 text-light">45</span>
                          </div>
                          <div className="d-flex">
                            <span className="material-icons mx-1">question_answer</span>
                            <span className="font-aside mx-1 text-light">14</span>
                          </div>
                        </div>
                      </Link>
                      <Link className="list-group-item-action text-decoration-none text-dark d-flex px-0 border border-dark px-1" to="#">
                        <div className="rounded-circle item-label-avatar-container color-4 mx-1 my-auto d-flex">
                          <img alt="user account icon" src="../icons/round_account_circle_black_24dp.png" className="w-100 align-middle"/>
                        </div>
                        <div className="">
                          <h2 className="my-0 font-aside fs-5 d-none d-lg-block bg-secondary text-light mx-1 mt-2 py-1 px-2 rounded">Wolfgang Amadeus</h2>
                          <p className="my-0 font-aside fs-6 my-2 mx-1">Lorem ipsum dolor sit amet, consectetur adipiscing</p>
                        </div>
                        <div className="d-flex flex-column justify-content-center bg-secondary rounded m-2 mx-auto px-2">
                          <div className="d-flex">
                            <span className="material-icons mx-1 text-dark">favorite</span>
                            <span className="font-aside mx-1 text-light">45</span>
                          </div>
                          <div className="d-flex">
                            <span className="material-icons mx-1">question_answer</span>
                            <span className="font-aside mx-1 text-light">14</span>
                          </div>
                        </div>
                      </Link>
                      <Link className="list-group-item-action text-decoration-none text-dark d-flex px-0 border border-dark px-1" to="#">
                        <div className="rounded-circle item-label-avatar-container color-4 mx-1 my-auto d-flex">
                          <img alt="user account icon" src="../icons/round_account_circle_black_24dp.png" className="w-100 align-middle"/>
                        </div>
                        <div className="">
                          <h2 className="my-0 font-aside fs-5 d-none d-lg-block bg-secondary text-light mx-1 mt-2 py-1 px-2 rounded">Wolfgang Amadeus</h2>
                          <p className="my-0 font-aside fs-6 my-2 mx-1">Lorem ipsum dolor sit amet, consectetur adipiscing</p>
                        </div>
                        <div className="d-flex flex-column justify-content-center bg-secondary rounded m-2 mx-auto px-2">
                          <div className="d-flex">
                            <span className="material-icons mx-1 text-dark">favorite</span>
                            <span className="font-aside mx-1 text-light">45</span>
                          </div>
                          <div className="d-flex">
                            <span className="material-icons mx-1">question_answer</span>
                            <span className="font-aside mx-1 text-light">14</span>
                          </div>
                        </div>
                      </Link>
                    </div>

                  </div>
                  <div className="tab-pane fade" id="last-posts-list" role="tabpanel" aria-labelledby="last-posts-list-tab">
                    
                    <div className="list-group">

                      <Link className="list-group-item list-group-item-action text-decoration-none text-dark d-flex px-0 color-4 border border-dark px-1" to="#">
                        <div className="rounded-circle item-label-avatar-container color-4 mx-1 my-auto d-flex">
                          <img alt="user account icon" src="icons/round_account_circle_black_24dp.png" className="w-100 align-middle"/>
                        </div>
                        <div className="">
                          <h2 className="my-0 font-aside fs-5 d-none d-lg-block bg-secondary text-light my-0 py-1 px-2 mx-1 rounded">Wolfgang Amadeus Pétasius</h2>
                          <p className="my-0 font-aside fs-6 my-2 mx-1">Lorem ipsum dolor sit amet, consectetur adipiscing</p>
                        </div>
                        <div className="d-flex align-items-center border border-dark mx-auto px-2 bg-secondary text-light rounded">
                          <span className="mx-1 font-aside fs-6 text-center">24/04/27 10h27</span>
                        </div>
                      </Link>
                      <Link className="list-group-item list-group-item-action text-decoration-none text-dark d-flex px-0 color-4 border border-dark px-1" to="#">
                        <div className="rounded-circle item-label-avatar-container color-4 mx-1 my-auto d-flex">
                          <img alt="user account icon" src="icons/round_account_circle_black_24dp.png" className="w-100 align-middle"/>
                        </div>
                        <div className="">
                          <h2 className="my-0 font-aside fs-5 d-none d-lg-block bg-secondary text-light my-0 py-1 px-2 mx-1 rounded">Wolfgang Amadeus Pétasius</h2>
                          <p className="my-0 font-aside fs-6 my-2 mx-1">Lorem ipsum dolor sit amet, consectetur adipiscing</p>
                        </div>
                        <div className="d-flex align-items-center border border-dark mx-auto px-2 bg-secondary text-light rounded">
                          <span className="mx-1 font-aside fs-6 text-center">24/04/27 10h27</span>
                        </div>
                      </Link>
                      <Link className="list-group-item list-group-item-action text-decoration-none text-dark d-flex px-0 color-4 border border-dark px-1" to="#">
                        <div className="rounded-circle item-label-avatar-container color-4 mx-1 my-auto d-flex">
                          <img alt="user account icon" src="icons/round_account_circle_black_24dp.png" className="w-100 align-middle"/>
                        </div>
                        <div className="">
                          <h2 className="my-0 font-aside fs-5 d-none d-lg-block bg-secondary text-light my-0 py-1 px-2 mx-1 rounded">Wolfgang Amadeus Pétasius</h2>
                          <p className="my-0 font-aside fs-6 my-2 mx-1">Lorem ipsum dolor sit amet, consectetur adipiscing</p>
                        </div>
                        <div className="d-flex align-items-center border border-dark mx-auto px-2 bg-secondary text-light rounded">
                          <span className="mx-1 font-aside fs-6 text-center">24/04/27 10h27</span>
                        </div>
                      </Link>
                      <Link className="list-group-item list-group-item-action text-decoration-none text-dark d-flex px-0 color-4 border border-dark px-1" to="#">
                        <div className="rounded-circle item-label-avatar-container color-4 mx-1 my-auto d-flex">
                          <img alt="user account icon" src="icons/round_account_circle_black_24dp.png" className="w-100 align-middle"/>
                        </div>
                        <div className="">
                          <h2 className="my-0 font-aside fs-5 d-none d-lg-block bg-secondary text-light my-0 py-1 px-2 mx-1 rounded">Wolfgang Amadeus Pétasius</h2>
                          <p className="my-0 font-aside fs-6 my-2 mx-1">Lorem ipsum dolor sit amet, consectetur adipiscing</p>
                        </div>
                        <div className="d-flex align-items-center border border-dark mx-auto px-2 bg-secondary text-light rounded">
                          <span className="mx-1 font-aside fs-6 text-center">24/04/27 10h27</span>
                        </div>
                      </Link>


                    </div>
                  </div>

                </div>
              
                 
            </aside>
            </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function BoxNotifications() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button className='color-1' onClick={() => setModalShow(true)}>
        <span className="material-icons mx-3">notifications</span>
        <span className="material-icons mx-3 d-none">notifications_active</span>
        <span className="d-none d-md-block">Notifications</span>
      </Button>

      <ModalBoxNotifications
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}


