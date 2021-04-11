const init = () => {
  var dragSrcEl = null;
  function handleDragStart(e) {
    // Target (this) element is the source node.

    dragSrcEl = this;
    dragSrcEl.style.opacity = '0.4';

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
  }

  function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault(); //  Allows us to drop.
    }

    e.dataTransfer.dropEffect = 'move';
    return false;
  }

  function handleDragEnter(e) {
    // this / e.target is the current hover target.
    this.classList.add('over');
  }

  function handleDragLeave(e) {
    this.classList.remove('over'); // this / e.target is previous target element.
  }
  function handleDrop(e) {
    // this/e.target is current target element.
    if (e.stopPropagation) {
      e.stopPropagation(); // Stops some browsers from redirecting.
    }
    // Don't do anything if dropping the same column we're dragging.
    if (dragSrcEl !== this) {
      // Set the source column's HTML to the HTML of the column we dropped on.
      dragSrcEl.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData('text/html');
      dragSrcEl.style.opacity = '1';
    }
    return false;
  }
  //------ get files ---
  const images = [];
  function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; (f = files[i]); i++) {
      // Only process image files.
      if (!f.type.match('image.*')) {
        continue;
      }
      var reader = new FileReader();
      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          // Render thumbnail.
          var div = document.createElement('div');
          div.setAttribute('class', 'box-image');
          div.setAttribute('draggable', 'true');
          div.innerHTML = [
            '<img class="thumb" src="',
            e.target.result,
            '"title="',
            escape(theFile.name),
            '"/>' + '<span>' + escape(theFile.name) + '</span>',
          ].join('');
          setListenersToDiv(div);
          document.getElementById('container').insertBefore(div, null);
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
      images.push(f);
    }
  }

  document.getElementById('files').addEventListener('change', handleFileSelect, false);
  // set listeners for each div
  function setListenersToDiv(div) {
    div.addEventListener('dragstart', handleDragStart, false);
    div.addEventListener('dragenter', handleDragEnter, false);
    div.addEventListener('dragover', handleDragOver, false);
    div.addEventListener('dragleave', handleDragLeave, false);
    div.addEventListener('drop', handleDrop, false);
  }
  //remove empy
  $('.upload').click(function() {
    $('.info-box').remove();
  });
  //count-Image
  $('#count').click(function() {
    var num = $('.box-image').length;
    $('.counter').text(num);
  });
};

export default {
  init,
};
