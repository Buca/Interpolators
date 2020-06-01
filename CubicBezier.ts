export class CubicBezier {

	public vertices:Float32Array;
	public coefficients:Float32Array;

	constructor( 

		x0 : f32, x1 : f32,
		x2 : f32, x3 : f32,
		start : f32, end : f32 

	) {

		this.vertices = new Float32Array( 6 );
		this.coefficients = new Float32Array( 4 );

		this.vertices[ 0 ] = x0;
		this.vertices[ 1 ] = x1;
		this.vertices[ 2 ] = x2;
		this.vertices[ 3 ] = x3;
		this.vertices[ 4 ] = start;
		this.vertices[ 5 ] = end;

		this.update();

	};

	public update() : void {

		let d : f32 = 1 / ( this.vertices[ 5 ] - this.vertices[ 4 ] ),
		   dd : f32 = d * d; 

		this.coefficients[ 0 ] = this.vertices[ 0 ];
		this.coefficients[ 1 ] = 3 * d * ( this.vertices[ 1 ] - this.vertices[ 0 ] );
		this.coefficients[ 2 ] = 3 * dd * ( this.vertices[ 0 ] - 2 * this.vertices[ 1 ] + this.vertices[ 2 ] );
		this.coefficients[ 3 ] = d * dd * ( this.vertices[ 3 ] - this.vertices[ 0 ] + 3 * ( this.vertices[ 1 ] - this.vertices[ 2 ] ) );

	};

	public get( x : f32 ) : f32 {

		return x * ( x * ( x * this.coefficients[ 3 ] + this.coefficients[ 2 ] ) + this.coefficients[ 1 ] ) + this.coefficients[ 0 ];

	}

};
