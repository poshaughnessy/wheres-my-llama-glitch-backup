const dropTarget = document.getElementById('dropTarget');
const imageElement = document.getElementById('image');
const canvas = document.getElementById('canvas');
const resetButton = document.getElementById('reset');

const dropTargetText = 'Drop your photo here';
const loadingText = 'Loading...';

// Unfortunately this model thinks that llamas are sheep. No!
const llamaClassifier = 'sheep';

// Initialise
dropTarget.addEventListener('filedrop', onFileDropEvent);
resetButton.addEventListener('click', onClickReset);
dropTarget.innerText = dropTargetText;
resetButton.disabled = true;

function onFileDropEvent(event) {
  console.log('Dropped file with name', event.file.name);
  
  dropTarget.innerText = loadingText;
  
  const reader = new FileReader();

  reader.onload = loadEvent => {
    console.log('onload file', loadEvent);
    imageElement.src = loadEvent.target.result;
    doObjectDetection();
  };

  reader.readAsDataURL(event.file);
  
};

function onClickReset() {
  dropTarget.innerText = dropTargetText;
  dropTarget.style.display = 'block';
  canvas.style.display = 'none';
  resetButton.disabled = true;
}

function doObjectDetection() {

  // Load the model.
  cocoSsd.load('lite_mobilenet_v2').then(model => {
    // Detect objects (hopefully llamas) in the image.
    model.detect(imageElement).then(results => {
      console.log('Predictions: ', results);
      
      canvas.width = imageElement.width;
      canvas.height = imageElement.height;
      const context = canvas.getContext('2d');
      context.drawImage(imageElement, 0, 0);

      console.log('number of detections: ', results.length);
      
      for (let i = 0; i < results.length; i++) {        
        const result = results[i];
                
        context.lineWidth = 2;          
     
        // Outer border
        context.beginPath();
        context.rect(result.bbox[0]-2, result.bbox[1]-2, result.bbox[2]+4, result.bbox[3]+4);
        context.strokeStyle = '#333';
        context.stroke();

        // Inner border
        context.beginPath();
        context.rect(result.bbox[0]+2, result.bbox[1]+2, result.bbox[2]-4, result.bbox[3]-4);
        context.strokeStyle = '#333';
        context.stroke();    

        // Inner colour
        context.beginPath();
        context.rect(...result.bbox);     
        context.strokeStyle = result.class === llamaClassifier ? '#41e3ca' : '#aaa';
        context.stroke();

        // Style for text
        context.font = '18px Arial';
        context.lineWidth = 4;      
        context.fillStyle = result.class === llamaClassifier ? '#41e3ca' : '#aaa';
        context.strokeStyle = '#333';

        const text = result.class === llamaClassifier ? 
              'Is this your llama?' : 
              `Not your llama (a ${result.class}?)`;
        const textX = result.bbox[0];
        const textY = result.bbox[1] > 12 ? result.bbox[1] - 7 : 12;

        // Draw text          
        context.strokeText(text, textX, textY);
        context.fillText(text, textX, textY);   
      }
      dropTarget.style.display = 'none';
      canvas.style.display = 'block';
      resetButton.disabled = false;
    });
  });

}
