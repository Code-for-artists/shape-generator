// utils.js
export const downloadSVGAsPNG = (svgNode) => {
    const svgData = new XMLSerializer().serializeToString(svgNode);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    // Set canvas size to the size of the svg
    canvas.width = svgNode.width.baseVal.value;
    canvas.height = svgNode.height.baseVal.value;

    img.onload = function() {
        // Draw the SVG image on the canvas
        ctx.drawImage(img, 0, 0);

        // Convert the canvas to a PNG data URL
        const pngFile = canvas.toDataURL('image/png');

        // Create a link element and trigger a download
        const downloadLink = document.createElement('a');
        downloadLink.href = pngFile;
        downloadLink.download = 'image.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    // Convert the SVG data to a base64 URL
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
};