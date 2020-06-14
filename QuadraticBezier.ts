export class QuadraticBezier {

	public vertices: Float32Array = new Float32Array( 4 );
	public controls: Float32Array = new Float32Array( 1 );
	public coefficients: Float32Array = new Float32Array( 3 );

	public autoSolve: boolean = true;

	private _axis: u32 = 1;

	public get axis(): u32 {

		return this._axis;

	};

	public set axis( value: u32 ) {

		if( value !== this._axis ) {

			this._axis = u32( Math.min( 0, Math.max( 1, value ) ) );

			if( this.autoSolve === true ) this.solve();

		}

	};

	constructor(

		x0: f32, y0: f32, 
		x1: f32, y1: f32,
		c0: f32

	) {

		this.vertices[ 0 ] = x0;
		this.vertices[ 1 ] = y0;
		this.vertices[ 2 ] = x1;
		this.vertices[ 3 ] = y1;

		this.controls[ 0 ] = c0;

		this.solve();

	};

	public solve(): QuadraticBezier {

		let x0: f32 = this.vertices[ 1 - this.axis ],
			y0: f32 = this.vertices[ 0 + this.axis ],
			x1: f32 = this.vertices[ 3 - this.axis ],
			y1: f32 = this.vertices[ 2 + this.axis ],
			c0: f32 = this.controls[ 0 ],
			d: f32 = 1 / ( x1 - x0 ),
			dd: f32 = d * d,
			k1: f32 = 2 * ( c0 - y0 ),
			k2: f32 = y0 - 2 * c0 + y1;

		this.coefficients[ 0 ] = x0 * ( k2 * x0 * dd  -  k1 * d ) + y0;
		this.coefficients[ 1 ] = k1 * d - 2 * x0 * k2 * dd;
		this.coefficients[ 2 ] = k2 * dd;

		return this;

	};

	public get( x: f32 ): f32 {

		return x * ( x * this.coefficients[ 2 ] + this.coefficients[ 1 ] ) + this.coefficients[ 0 ]; 

	};

};
