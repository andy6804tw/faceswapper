const fileUploader = document.querySelector('#file-uploader');
const dst_img = document.getElementById("dst_img");
const sectionResult=document.getElementById("sectionResult");

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});
fileUploader.addEventListener('change', async (e) => {

  // console.log(e.target.files[0]); // get file object
});



const postImage = async () => {
  const file1 = await toBase64(fileUploader.files[0]);
  const image1 = file1.split(",")[1];
  const file2 = await toBase64(dst_img.files[0]);
  const image2 = file2.split(",")[1];
  document.getElementById("loading").classList.remove("d-none");
  // console.log(image1);
  axios.post(`https://faceswaper.herokuapp.com/swap`, {
    image1,
    image2
  })
    .then((response) => {
      var dataObject = response.data;
      // POST success
      const responseImg = dataObject.result.split("'")[1];
      compareImage(dataObject.image2, responseImg);
      // document.getElementById('image').src = `data:image/jpeg;base64,${responseImg}`;
      document.getElementById('image1').src = `data:image/jpeg;base64,${dataObject.image1}`;
      document.getElementById('image2').src = `data:image/jpeg;base64,${dataObject.image2}`;
      console.log(dataObject)
      sectionResult.classList.remove("d-none");
      window.location.href = '#sectionResult';
      document.getElementById("loading").classList.add("d-none");
    },
      (error) => {
        var message = error.response.data.message;
      }
    );
}

/** Comparison of image */
const compareImage= (imgBefore, imgAfter)=>{
  document.getElementsByClassName('juxtapose')[0].innerHTML='';
  slider = new juxtapose.JXSlider('.juxtapose',
    [
      {
        src: `data:image/jpeg;base64,${imgBefore}`,
        label: 'Before',
        // credit: 'Image Credit'
      },
      {
        src: `data:image/jpeg;base64,${imgAfter}`,
        label: 'After',
        // credit: "Image Credit"
      }
    ],
    {
      animate: true,
      showLabels: true,
      showCredits: true,
      startingPosition: "50%",
      makeResponsive: true
    });


  setTimeout(function () {
    document.getElementsByClassName("jx-knightlab")[0].remove();
  }, 500)
}

