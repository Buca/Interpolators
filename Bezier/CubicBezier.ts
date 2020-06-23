export class CubicBezier {

	public vertices: Float32Array = new Float32Array( 4 );
	public controls: Float32Array = new Float32Array( 2 );
	public coefficients: Float32Array = new Float32Array( 4 );

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

		c0: f32, c1: f32 

	) {

		this.vertices[ 0 ] = x0; // 4 start
		this.vertices[ 1 ] = y0; // 0
		this.vertices[ 2 ] = x1; // 5 end 
		this.vertices[ 3 ] = y1; // 3

		this.controls[ 0 ] = c0; // 1
		this.controls[ 1 ] = c1; // 2
		
		this.solve();

	};

	public solve(): CubicBezier {

		let x0: f32 = this.vertices[ 1 - this.axis ],
			y0: f32 = this.vertices[ 0 + this.axis ],
			x1: f32 = this.vertices[ 3 - this.axis ],
			y1: f32 = this.vertices[ 2 + this.axis ],
			c0: f32 = this.controls[ 0 ],
			c1: f32 = this.controls[ 1 ],
			d: f32 = 1 / ( x1 - x0 ),
			dd: f32 = d * d,
			k0: f32 = y0,
			k1: f32 = 3 * d * ( c0 - y0 ),
			k2: f32 = 3 * dd * ( y0 - 2 * c0 + c1 ),
			k3: f32 = d * dd * ( y1 - y0 + 3 * ( c0 - c1 ) );

		this.coefficients[ 0 ] = x0 * ( x0 * ( -x0 * k3 + k2 ) - k1 ) + k0;
		this.coefficients[ 1 ] = x0 * ( 3 * x0 * k3 - 2 * k2 ) + k1;
		this.coefficients[ 2 ] = - 3 * x0 * k3 + k2;
		this.coefficients[ 3 ] = k3;

		return this;

	};

	public get( x: f32 ): f32 {

		return x * ( x * ( x * this.coefficients[ 3 ] + this.coefficients[ 2 ] ) + this.coefficients[ 1 ] ) + this.coefficients[ 0 ];

	};

};