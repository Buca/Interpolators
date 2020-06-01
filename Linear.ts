export class Linear {

	public vertices : Float32Array;
	public coefficients : Float32Array;

	public update() : void {

		this.coefficients[ 0 ] = 1 / ( this.vertices[ 2 ] - this.vertices[ 0 ] );
		this.coefficients[ 1 ] = this.coefficients[ 0 ] * ( this.vertices[ 3 ] - this.vertices[ 1 ] );
		this.coefficients[ 0 ] *= ( this.vertices[ 2 ] * this.vertices[ 1 ] - this.vertices[ 0 ] * this.vertices[ 3 ] );

	};

	public get( x:f32 ):f32 {

		return this.coefficients[ 0 ] + this.coefficients[ 1 ] * x;

	};

	constructor( 
    
		x0 : f32, y0 : f32,
		x1 : f32, y1 : f32
    
    ) {

		this.vertices = new Float32Array( 4 );
		this.coefficients = new Float32Array( 2 );

		this.vertices[ 0 ] = x0;
		this.vertices[ 1 ] = y0;
		this.vertices[ 2 ] = x1;
		this.vertices[ 3 ] = y1;

		this.update();

	};

};
