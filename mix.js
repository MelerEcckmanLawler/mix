//mix('rgb(56, 144, 185)', 'rgb(246, 255, 0)')
//returns
//'rgb(140, 196, 111)'

function mix(color1, color2) {
	color1 = RGBstr_to_RGBobj(color1)
	color2 = RGBstr_to_RGBobj(color2)
  if ((typeof(color1) == 'object') && (color1 instanceof Array) == false) {
		color1 = new Array(color1, color2)
	}
  C = 0
  M = 0
  Y = 0
  K = 0
  for (var i = 0; i < color1.length; i++) {
    color1[i] = RGB_to_CMYK(color1[i])
    C += color1[i].c
    M += color1[i].m
    Y += color1[i].y
    K += color1[i].k
  }
  C /= color1.length
  M /= color1.length
  Y /= color1.length
  K /= color1.length
	color = {
		c: C,
		m: M,
		y: Y,
		k: K
	}
  return CMYK_to_RGB(color)
}

function RGB_to_CMYK(color) {
  cyan    = 255 - color.r
  magenta = 255 - color.g
  yellow  = 255 - color.b
  black   = Math.min(cyan, magenta, yellow)
  cyan    = ((cyan - black) / (255 - black))
  magenta = ((magenta - black) / (255 - black))
  yellow  = ((yellow  - black) / (255 - black))
	return {
		c: cyan, 
		m: magenta, 
		y: yellow, 
		k: black / 255
	}
}

function CMYK_to_RGB(color) {
  color.c = color.c
  color.m = color.m
  color.y = color.y
  color.k = color.k
  R = color.c * (1.0 - color.k) + color.k
  G = color.m * (1.0 - color.k) + color.k
  B = color.y * (1.0 - color.k) + color.k
  R = Math.round((1.0 - R) * 255 + 0.5)
  G = Math.round((1.0 - G) * 255 + 0.5)
	B = Math.round((1.0 - B) * 255 + 0.5)
  return `rgb(${R}, ${G}, ${B})`
}

function RGBstr_to_RGBobj(RGBstr) {
	RGBstr = RGBstr.split(',')
	return {
		r: RGBstr[0].slice(4), 
		g: RGBstr[1].replace(' ', ''), 
		b: RGBstr[2].replace(' ', '').replace(')', '')
	}
}
