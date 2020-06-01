export class Quadratic {

	public vertices : Float32Array;
	public coefficients : Float32Array;

	constructor( 
	
		x0 : f32, y0 : f32,
		x1 : f32, y1 : f32,
		x2 : f32, y2 : f32 
	
	) {

		this.vertices = new Float32Array( 6 ); 
		this.coefficients = new Float32Array( 3 );

		this.vertices[ 0 ] = x0; 
		this.vertices[ 1 ] = y0;
		this.vertices[ 2 ] = x1;
		this.vertices[ 3 ] = y1;
		this.vertices[ 4 ] = x2;
		this.vertices[ 5 ] = y2;

		this.update();

	};

	public update() : void {

		let x0 : f32 = this.vertices[ 0 ],
		    x1 : f32 = this.vertices[ 2 ],
		    x2 : f32 = this.vertices[ 4 ],
		    x12 : f32 = x1 * x2,
		    x02 : f32 = x0 * x2,
		    x01 : f32 = x0 * x1,
		    inv12 : f32 = this.vertices[ 1 ] / ( x0 * ( x0 - x1 - x2 ) + x12 ),
		    inv02 : f32 = this.vertices[ 3 ] / ( x1 * ( x1 - x0 - x2 ) + x02 ),
		    inv01 : f32 = this.vertices[ 5 ] / ( x2 * ( x2 - x0 - x1 ) + x01 );

		this.coefficients[ 0 ] = x12 * inv12 + x02 * inv02 + x01 * inv01;
		this.coefficients[ 1 ] = - ( x1 + x2 ) * inv12 - ( x0 + x2 ) * inv02 - ( x0 + x1 ) * inv01;
		this.coefficients[ 2 ] = inv12 + inv02 + inv01;

	};

	public get( x : f32 ) : f32 {

		return x * ( x * this.coefficients[ 2 ] + this.coefficients[ 1 ] ) + this.coefficients[ 0 ];

	};

};
