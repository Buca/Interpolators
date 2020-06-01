export class QuadraticBezier {

	public vertices : Float32Array;
	public coefficients : Float32Array;

	constructor(

		x0 : f32, x1 : f32, x2 : f32,
		min : f32,
		max : f32

	) {

		this.vertices = new Float32Array( 5 );
		this.coefficients = new Float32Array( 3 );

		this.vertices[ 0 ] = x0;
		this.vertices[ 1 ] = x1;
		this.vertices[ 2 ] = x2;
		this.vertices[ 3 ] = min;
		this.vertices[ 4 ] = max;

		this.update();

	};

	public update() : void {

		let d : f32 = 1 / ( this.vertices[ 4 ] - this.vertices[ 3 ] ),
		   dd : f32 = d * d,
		   c1 : f32 = 2 * ( this.vertices[ 1 ] - this.vertices[ 0 ] ),
		   c2 : f32 = this.vertices[ 0 ] - 2 * this.vertices[ 1 ] + this.vertices[ 2 ];

		this.coefficients[ 0 ] = ( ( c2 * this.vertices[ 3 ] * this.vertices[ 3 ] ) * dd ) - ( c1 * this.vertices[ 3 ] ) * d + this.vertices[ 0 ];
		this.coefficients[ 1 ] = c1 * d - 2 * this.vertices[ 3 ] * c2 * dd;
		this.coefficients[ 2 ] = c2 * dd;

	};

	public get( x : f32 ) : f32 {

		return x * ( x * this.coefficients[ 2 ] + this.coefficients[ 1 ] ) + this.coefficients[ 0 ]; 

	};

};
