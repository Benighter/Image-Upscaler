chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'viewImages') {
      viewImages();
    }
  });
  
  function viewImages() {
    const images = document.querySelectorAll('img');
    images.forEach(image => {
      image.addEventListener('click', function () {
        openFullScreen(image.src);
      });
    });
  }
  
  function openFullScreen(imageUrl) {
    const fullScreenDiv = document.createElement('div');
    fullScreenDiv.style.position = 'fixed';
    fullScreenDiv.style.top = '0';
    fullScreenDiv.style.left = '0';
    fullScreenDiv.style.width = '100%';
    fullScreenDiv.style.height = '100%';
    fullScreenDiv.style.backgroundColor = 'rgba(0,0,0,0.8)';
    fullScreenDiv.style.display = 'flex';
    fullScreenDiv.style.flexDirection = 'column';
    fullScreenDiv.style.alignItems = 'center';
    fullScreenDiv.style.justifyContent = 'center';
  
    const fullScreenImage = document.createElement('img');
    fullScreenImage.src = imageUrl;
    fullScreenImage.style.maxWidth = '80%';
    fullScreenImage.style.maxHeight = '80%';
    fullScreenImage.style.cursor = 'pointer';
  
    const downloadButton = document.createElement('button');
    downloadButton.textContent = 'Download Image';
    downloadButton.style.marginTop = '10px';
    downloadButton.style.padding = '8px';
    downloadButton.style.backgroundColor = '#4CAF50';
    downloadButton.style.color = 'white';
    downloadButton.style.border = 'none';
    downloadButton.style.borderRadius = '5px';
    downloadButton.style.cursor = 'pointer';
  
    const zoomInButton = document.createElement('button');
    zoomInButton.textContent = 'Zoom In';
    zoomInButton.style.marginTop = '10px';
    zoomInButton.style.padding = '8px';
    zoomInButton.style.backgroundColor = '#3498db';
    zoomInButton.style.color = 'white';
    zoomInButton.style.border = 'none';
    zoomInButton.style.borderRadius = '5px';
    zoomInButton.style.cursor = 'pointer';
  
    const zoomOutButton = document.createElement('button');
    zoomOutButton.textContent = 'Zoom Out';
    zoomOutButton.style.marginTop = '10px';
    zoomOutButton.style.padding = '8px';
    zoomOutButton.style.backgroundColor = '#e74c3c';
    zoomOutButton.style.color = 'white';
    zoomOutButton.style.border = 'none';
    zoomOutButton.style.borderRadius = '5px';
    zoomOutButton.style.cursor = 'pointer';
  
    fullScreenDiv.appendChild(fullScreenImage);
    fullScreenDiv.appendChild(downloadButton);
    fullScreenDiv.appendChild(zoomInButton);
    fullScreenDiv.appendChild(zoomOutButton);
    document.body.appendChild(fullScreenDiv);
  
    downloadButton.addEventListener('click', function () {
      downloadImage(imageUrl);
    });
  
    zoomInButton.addEventListener('click', function () {
      zoomImage(fullScreenImage, 1.2);
    });
  
    zoomOutButton.addEventListener('click', function () {
      zoomImage(fullScreenImage, 0.8);
    });
  
    fullScreenDiv.addEventListener('click', function () {
      document.body.removeChild(fullScreenDiv);
    });
  }
  
  function downloadImage(url) {
    const link = document.createElement('a');
    link.href = url;
    link.download = 'downloaded_image';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  function zoomImage(imageElement, factor) {
    const currentWidth = imageElement.width;
    const currentHeight = imageElement.height;
  
    const newWidth = currentWidth * factor;
    const newHeight = currentHeight * factor;
  
    imageElement.style.width = newWidth + 'px';
    imageElement.style.height = newHeight + 'px';
  }
  