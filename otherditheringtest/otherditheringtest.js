function setup() {
  plant = loadImage('michelangelosdavid.png') //Put your image here
  console.log(plant) //And the image dimensions here
  createCanvas(400,400) //Not especially sure why, but you gotta make the image dimensions
                          //A bit bigger than the image itself to get a smooth output
  frameRate(1) //Increase this if u wanna annoy ur computer
  image(plant, 0, 0)
 
}
//The closest pallete color function, figure it out
function find_closest_pallete_color(valueInput){
  if (valueInput > 172){
    return 255
  } else if (valueInput > 130){
    return 128
  } else {
    return 0
  }
}

function draw() {
  
  image(plant, 0, 0)
  loadPixels() //Loadpixels to modify
  
  for (let y = 0; y <= plant.height*4; y++) { //Iterates through the total number of pixels
    for (let x = 0; x <= (plant.width)*4; x++) { //The *4 is because, in the array pixels[] there are four values, RGBA, governing a single pixel
      
      let oldr, oldg, oldb, olda; //Declared various variables
      let newr, newg, newb, newa;
      let quant_error
      
      oldr = pixels[(x + y*width)*4 + 0] //Sets oldx to be the specific x,y coordinate pair IN ADDITION TO the specific color
      oldg = pixels[(x + y*width)*4 + 1] //The +x at the end is an offset determining which color channel is used
      oldb = pixels[(x + y*width)*4 + 2] //x + y*width is to find the position in a linear array that a pixel occupies
      olda = pixels[(x + y*width)*4 + 3] //Alpha will not be used
      
      pixels[(x + y*width)*4 + 0] = find_closest_pallete_color(0.3*oldr + 0.59*oldg + 0.11*oldb) //Turns the image grayscale AND 
      pixels[(x + y*width)*4 + 1] = find_closest_pallete_color(0.3*oldr + 0.59*oldg + 0.11*oldb) //Implements the closest pallete function
      pixels[(x + y*width)*4 + 2] = find_closest_pallete_color(0.3*oldr + 0.59*oldg + 0.11*oldb) //0.3*oldr + 0.59*oldg + 0.11*oldb is  just a way to grayscale the image
      
      newr = find_closest_pallete_color(oldr) //Bit of redundancy here, but I don't want to fix it
      newg = find_closest_pallete_color(oldg)
      newb = find_closest_pallete_color(oldb)
      
      quant_error_r = oldr-newr //This defines the difference between the color gamut with the larger selection
      quant_error_g = oldg-newg //And the color gamut with the smaller selection
      quant_error_b = oldb-newb
      
      //Red (that is what the +0 is) 
      //This is the Floyd Steinberg implementation, pretty easy to figure out. This is the same for green and blue
      pixels[((x+1) + (y)*width)*4 + 0] = pixels[((x+1) + (y)*width)*4 + 0] + quant_error_r * 7/16
      pixels[((x-1) + (y+1)*width)*4 + 0] = pixels[((x-1) + (y+1)*width)*4 + 0] + quant_error_r * 3/16
      pixels[((x) + (y+1)*width)*4 + 0] = pixels[((x) + (y+1)*width)*4 + 0] + quant_error_r * 5/16
      pixels[((x+1) + (y+1)*width)*4 + 0] = pixels[((x+1) + (y+1)*width)*4 + 0] + quant_error_r * 1/16
      
      //Green (the +1)
      pixels[((x+1) + (y)*width)*4 + 1] = pixels[((x+1) + (y)*width)*4 + 1] + quant_error_g * 7/16
      pixels[((x-1) + (y+1)*width)*4 + 1] = pixels[((x-1) + (y+1)*width)*4 + 1] + quant_error_g * 3/16
      pixels[((x) + (y+1)*width)*4 + 1] = pixels[((x) + (y+1)*width)*4 + 1] + quant_error_g * 5/16
      pixels[((x+1) + (y+1)*width)*4 + 1] = pixels[((x+1) + (y+1)*width)*4 + 1] + quant_error_g * 1/16
      
      //Blue (the +2)
      pixels[((x+1) + (y)*width)*4 + 2] = pixels[((x+1) + (y)*width)*4 + 2] + quant_error_b * 7/16
      pixels[((x-1) + (y+1)*width)*4 + 2] = pixels[((x-1) + (y+1)*width)*4 + 2] + quant_error_b * 3/16
      pixels[((x) + (y+1)*width)*4 + 2] = pixels[((x) + (y+1)*width)*4 + 2] + quant_error_b * 5/16
      pixels[((x+1) + (y+1)*width)*4 + 2] = pixels[((x+1) + (y+1)*width)*4 + 2] + quant_error_b * 1/16
       
    }
  }
  updatePixels() //Gotta update the pixels u know
}
