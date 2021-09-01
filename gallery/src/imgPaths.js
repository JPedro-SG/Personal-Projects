import RNFS from 'react-native-fs'


function deviceStorageImages() {
    
    async function storeAllImages(myPath = "", imgs = []) {
      
      const results = await RNFS.readDir(RNFS.ExternalStorageDirectoryPath + "/" + myPath)

      for(let i = 0; i < results.length; i++){
          if(results[i].isDirectory()) {

            const notAndroidPath = results[i].name !== 'Android'
            const notTelegramPath = results[i].name !== 'Telegram'
            const onlyLetters = !results[i].name.match(/(?:\.|,|[0-9])/)
  
            if(notAndroidPath && onlyLetters) await storeAllImages(myPath + "/" + results[i].name, imgs);
            

          } else {

            // if(results[i].name.match(/.*\.(gif|jpe?g|bmp|png)$/igm)) setInit([...init, results[i]]);
            if(results[i].name.match(/\.(gif|jpg|jpeg|tiff|png)$/i)) {

              // init.forEach(item => console.log(item.name))
              // setInit(current => [...current, results[i]]);
              imgs.push(results[i])

            }
          } 
      }

    }
    
    async function getImages() {
        let imgs = []
        await storeAllImages("", imgs)

        return imgs
    }

    return { 
      getImages
    }
}

export default deviceStorageImages

// function SearchImagesStorage(myPath) {
  //   const notAndroidPath = myPath != RNFS.ExternalStorageDirectoryPath + '/Android'
  //   const onlyLetters = !myPath.match(/(?:\.|,|[0-9])/)

  //   if(notAndroidPath) {
  //     RNFS.readDir(myPath).then(results => {
  //       results.forEach(res => {
  //         if(res.isDirectory()) {
  //           SearchImagesStorage(res.path) 
  //         }else {
  //           if(res.name.match(/.*\.(gif|jpe?g|bmp|png)$/igm)) setInit([...init, res]);
  //         }
  //       })
  //     })
  //   }
  // }


//   function SearchImagesStorage(myPath = "", imgs = []) {
    
//     RNFS.readDir(RNFS.ExternalStorageDirectoryPath + "/" + myPath).then(results => {
//       results.forEach(res => {

//         if(res.isDirectory()) {
//           const notAndroidPath = res.name !== 'Android'
//           const onlyLetters = !res.name.match(/(?:\.|,|[0-9])/)

//           if(notAndroidPath && onlyLetters) {
          
//             SearchImagesStorage(myPath + "/" + res.name, imgs);
//           }
//         }else {
//           // if(res.name.match(/.*\.(gif|jpe?g|bmp|png)$/igm)) setInit([...init, res]);
//           if(res.name.match(/\.(gif|jpg|jpeg|tiff|png)$/i)) {
//             // init.forEach(item => console.log(item.name))
//             // setInit(current => [...current, res]);
//             imgs.push(res)
//           } 
//         } 
//       })
//     })
// }

// results.forEach(async res => {
    
        //   if(res.isDirectory()) {

        //     const notAndroidPath = res.name !== 'Android'
        //     const onlyLetters = !res.name.match(/(?:\.|,|[0-9])/)
  
        //     if(notAndroidPath && onlyLetters) await SearchImagesStorage(myPath + "/" + res.name, imgs);
            

        //   } else {

        //     // if(res.name.match(/.*\.(gif|jpe?g|bmp|png)$/igm)) setInit([...init, res]);
        //     if(res.name.match(/\.(gif|jpg|jpeg|tiff|png)$/i)) {

        //       // init.forEach(item => console.log(item.name))
        //       // setInit(current => [...current, res]);
        //       imgs.push(res)

        //     } 
        //   } 

        // })
  