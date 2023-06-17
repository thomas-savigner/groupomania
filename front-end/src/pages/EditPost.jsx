import React from "react";
import { useFormik } from "formik";
import postService from "../services/post.service";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";


const PostAPost = () => {

  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("User data"));
    const postUserID = userData.userID;
    const avatarUrl = userData.avatar;
    const firstName = userData.firstName;
    const lastName = userData.lastName;
    const department = userData.department;


  const userPostInfos = localStorage.getItem('UserPostDetails');
    
    let postInfos = '';
    let postStatus = '';
    let postIDToModify = '';
    
    if ( userPostInfos.postID !== null ) {

      postInfos = JSON.parse(userPostInfos);

      postStatus = postInfos.status;
      postIDToModify = postInfos.postID;

    } else {

      postInfos = JSON.parse(userPostInfos);

      postStatus = postInfos.status;

    }

  
    const [ postPreviewPhoto, setPostPreviewPhoto] = React.useState('/icons/insert_photo.png');
  
    const [ postHashtags, setPostHashtags ] = React.useState('');
    
    const [ postTopic, setPostTopic ] = React.useState('');
    
    const [ postArticle, setPostArticle ] = React.useState('');


    

    
  
  
  //--- Form image preview --- 
  const handleFileOnChange = (event) => {
      
    const file = event.currentTarget.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPostPreviewPhoto(reader.result)
       
    };

    formik.setFieldValue("file", file);  

  };


  //---  Loading new hashtags values before only save or save and release it    
  const handleChangeHastags = (event) => {
    
    const hashtagsSet = event.target.value;

    setPostHashtags(hashtagsSet);

    formik.setFieldValue("hashtags", hashtagsSet);

  }


  //---  Loading new topic value before only save or save and release it
  const handleChangeTopic = (event) => {
    const titleTopic = event.target.value;
    
    setPostTopic(titleTopic);

    formik.setFieldValue("topic", titleTopic)
  }


  //---  Loading new article content before only save or save and release it
  const handleChangeArticle = (event) => {
    const articleContent = event.target.value;

    setPostArticle(articleContent);

    formik.setFieldValue("article", articleContent)
    
  }
   


  //---  create post instance in database, post not publish  ---
  const createPost = () => {

    const file = formik.values.file;
    const userID = postUserID;
    const hashtags = postHashtags;
    const topic = postTopic;
    const article = postArticle;
    const isRelease = false; 
    
    
    postService.createPost(  file, userID, hashtags, topic, article, isRelease  )
      .then( (data) => {
        console.log(data.data)
        alert( "Brouillon sauvegardé et non publié" )
        
        navigate('/app/upstreamflow', { replace: true });

      })
      .catch( (error) => { alert( "erreur à la sauvegarde de votre brouillon: " + error )} )

  }


  //---  modify a post instance in database, post not publish ---
  const updatePost = (  ) => {

    let newFile = '';
    if (formik.values.file !== null) {
      newFile = formik.values.file; 
    }

    const file = newFile;
    const userID= postUserID;
    const hashtags = postHashtags;
    const topic = postTopic;
    const article = postArticle;
    const isRelease = false;

    postService.updatePost( postIDToModify, file, userID, hashtags, topic, article, isRelease )
      .then( (data) => {
        
        alert( "Brouillon sauvegardé et non publié, contenu:"+data)
        
        navigate('/app/upstreamflow', { replace: true });

      })
      .catch( (error) => { alert( "erreur lors de la sauvegarde de votre brouillon: " + error )} )

  }


  //---  Save post draft in database by creating 
  //     database post instance if doesn't exist or modify an existing post instance   
  const handleSave = () => {

    if ( postStatus === false ) { 
        
      createPost() 
      
    } else {
      
      updatePost()

    }

  }
  


  //const createSubmitPost = (


  //const updateSubmitPost = 
  //}


  const formik = useFormik(
  
    {

      initialValues: {
        file: null,
        hashtags: '',
        topic: '',
        article: '',
      },    

      validationSchema: 
        object().shape({
            hashtags: string()
                .min(5, 'Minimum un hashtag... un mot de 5 lettres')
                .max(100, 'Vos hasthags ne doivent pas dépasser un total de 100 caractères')
                .required('Veuillez renseigner au moins un #hashtag'),
            topic: string()
                .min(5, 'Minimum un mot de 5 lettres')
                .max(80, 'Votre titre / sujet ne doit pas dépasser 80 caractères')
                .required('Veuillez renseigner au moins un mot'),
            article: string()
                  .min(5, '1 mot de 5 lettres minimum')
                  .max(3000, 'Votre article ne doit pas dépasser un total de 3000 caractères')
                  .required('Veuillez renseigner au moins une phrase'),
        })
      ,

      //---  Release post in PostUpStreamFlow & send post form values in database by creating 
      //     database post instance if doesn't exist or modify an existing post instance  
      onSubmit: postStatus ? () => {

        const file = formik.values.file;
        const userID = postUserID;
        const hashtags = formik.values.hashtags;
        const topic = formik.values.topic;
        const article = formik.values.article;
        const isRelease = true; 
    
        postService.updatePost( postIDToModify, { file, userID, hashtags, topic, article, isRelease }  )
          .then( (data) => {
            
            console.log(data)
            
            alert( "Article publié")
              
            navigate('/app/upstreamflow', { replace: true });
    
          })
          .catch( (error) => { alert( "erreur lors de la publication de votre post: " + error)} ) 
        }
          : 
          
          () => {

            const file = formik.values.file;
            const userID = postUserID;
            const hashtags = formik.values.hashtags;
            const topic = formik.values.topic;
            const article = formik.values.article;
            const isRelease = true; 
        
        
            postService.createPost( file, userID, hashtags, topic, article, isRelease  )
              .then( (data) => {
                
                console.log(data)
                
                alert( "Article publié")
                  
                navigate('/app/upstreamflow', { replace: true });
        
              })
              .catch( (error) => { alert( "erreur lors de la publication de votre post: " + error)} )
          } ,
      
    }

  )

  
  //---  Loading post data if existing   ---
  
  React.useEffect( () => { 
    if ( postStatus ) { 
    
      postService.focusOnPostandComments(postIDToModify)
        .then( ( response ) => {
        
          
          setPostHashtags(response.data.postComments.hashtags);
          setPostTopic(response.data.postComments.topic);
          setPostArticle(response.data.postComments.article);
          setPostPreviewPhoto(response.data.postComments.imageUrl);

        }
        )
        .catch( (error) => alert(error))
      
  } 
  }, [ postIDToModify, postStatus] )

  return (
            <>
             
              <section className="article-position article-size border border-dark mx-auto mt-1 color-4">
                
                <header className="d-flex p-1 color-2">

                  <img 
                        alt="user account avatar" 
                        src={avatarUrl} 
                        className="rounded-circle avatar-art-width" 
                  />
                  
                  <div className="mx-2 text-dark d-flex flex-wrap w-100">
                    <h2 className="my-0 font-title fs-5 w-100">{firstName} {lastName}</h2>
                    <p className="my-0 font-text fs-6 w-50">{department}</p>
                  </div>

                </header>

                <main className="p-0">

                <form onSubmit={formik.handleSubmit} className="px-3">
                  <fieldset>
                    <div className="form-group">
                      <div className="input-group color-1 border border-dark mx-auto my-2" >
                        <div className="mx-auto py-1 article-picture-container my-2 border border-2 border-dark">
                          <img 
                              className="thumbnail w-100 h-auto img-fit" 
                              id="articletphoto"
                              alt="photograly related with article" 
                              title="Preview profile photo" 
                              src={postPreviewPhoto} /> 
                        </div>
                        <div className="input-group-btn mx-1 pt-1 pb-2 d-flex align-items-center">
                          <div className="fileUpload color-3 fake-shadow rounded border border-light border-2 d-flex flex-column">
                            <p className='font-title text-light text-center my-2'>J'insère une photo</p>
                            <input 
                                    id="file" 
                                    name="file" 
                                    type="file" 
                                    onChange={handleFileOnChange}
                                    className="w-100 rounded mx-3 font-aside"
                              />
                            <p className="text-light font-title text-center my-2">*fichiers acceptés: jpg, jpeg et png</p>  
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                        
                        <textarea 
                                  id="hashtags"
                                  name="hashtags"
                                  placeholder="#Hashtags, #Hashtags..."
                                  onChange={handleChangeHastags}
                                  value={formik.values.hashtags}
                                  className="form-control my-1 border border-dark post-hashtags-area font-title"
                        />
                    
                        { formik.errors.hashtags && formik.touched.hashtags && (
                            <p className="text-danger font-aside my-1 p-3">{formik.errors.hashtags}</p> 
                          )}
                    
                      </div>
                      <div className="form-group">
                        
                        <textarea 
                                  id="topic"
                                  name="topic"
                                  placeholder="Titre / Sujet du post"
                                  onChange={handleChangeTopic}
                                  value={formik.values.topic}
                                  className="form-control my-1 border border-dark post-topic-area font-text"
                        />
                    
                        { formik.errors.topic && formik.touched.topic && (
                            <p className="text-danger font-aside my-1">{formik.errors.topic}</p> 
                          )}
                    
                      </div>
                      <div className="form-group">
                        
                        <textarea 
                                  id="article"
                                  name="article"
                                  placeholder="Votre article...🧐"
                                  onChange={handleChangeArticle}
                                  value={formik.values.article}
                                  className="form-control my-1 border border-dark post-article-area font-text"
                        />
                       
                        { formik.errors.article && formik.touched.article && (
                            <p className="text-danger font-aside my-1">{formik.errors.article}</p> 
                          )}
                    
                      </div>
                        <div  className='p-2'>
                          <input 
                                        id="savebutton"
                                        name="savebutton" 
                                        type="button" 
                                        value="Enregisrer mon brouillon"
                                        onClick={handleSave}
                                        className="color-3 text-light border border-dark my-2 font-aside"
                          />
                          <div className="form-group">          
                            <input 
                                          id="submitbutton"
                                          name="submitbutton" 
                                          type="submit"
                                          
                                          value="Partager avec mes collègues"
                                          className="color-3 text-light border border-dark my-2 font-aside "
                            />
                          </div>
                        </div>
                    </fieldset>
                    </form>
                    <div className="d-flex justify-content-center">
                      <nav className="color-3  my-2 px-2 py-1">
                        <Link 
                              to="/app/upstreamflow" 
                              className="text-light font-aside text-decoration-none"
                        >
                          Annuler mon Post
                        </Link>
                    </nav>
                  </div>
                </main>


              </section>
            </>
        );
}

export default PostAPost;
