export class Biexponential {

	public vertices: Float32Array = new Float32Array( 12 );
	public coefficients: Float32Array = new Float32Array( 4 );

	public autoSolve: boolean = true;

	private _axis: u32 = 1;

	public get axis(): u32 {

		return this._axis;

	};

	public set axis( value: u32 ) {

		if( value !== this._axis ) {

			this._axis = u32( Math.max( 0, Math.min( 2, value ) ) );

			if( this.autoSolve === true ) this.solve();

		}

	};

	constructor( 

		x00: f32, y00: f32, z00: f32,
		x01: f32, y01: f32, z01: f32,
		x10: f32, y10: f32, z10: f32,
		x11: f32, y11: f32, z11: f32,

	) {

		this.vertices[ 0 ] = x00;
		this.vertices[ 1 ] = y00;
		this.vertices[ 2 ] = z00;
		this.vertices[ 3 ] = x01;
		this.vertices[ 4 ] = y01;
		this.vertices[ 5 ] = z01;
		this.vertices[ 6 ] = x10;
		this.vertices[ 7 ] = y10;
		this.vertices[ 8 ] = z10;
		this.vertices[ 9 ] = x11;
		this.vertices[ 10 ] = y11;
		this.vertices[ 11 ] = z11;

		this.solve();

	};

	public solve(): Biexponential {

		let x0: f32 = this.vertices[ 1 - this.axis ],
			y0: f32 = this.vertices[ 0 + this.axis ],
			x1: f32 = this.vertices[ 3 - this.axis ],
			y1: f32 = this.vertices[ 2 + this.axis ],
			inverse_d: f32 = 1 / ( x1 - x0 );

		this.coefficients[ 0 ] = inverse_d * x0;
		this.coefficients[ 1 ] = inverse_d;

		return this;

	};

	public get( x: f32, y: f32 ): f32 {

		let x0: f32 = this.vertices[ 0 ],
			y0: f32 = this.vertices[ 1 ],
			x1: f32 = this.vertices[ 9 ],
			y1: f32 = this.vertices[ 10 ],
			w00: f32 = this.vertices[ 2 ],
			w01: f32 = this.vertices[ 5 ],
			w10: f32 = this.vertices[ 8 ],
			w11: f32 = this.vertices[ 11 ];

		let k0 = w00 * Mathf.pow( w01 / w00, ( x - x0 ) / ( x1 - x0 ) ),
			k1 = w10 * Mathf.pow( w11 / w10, ( x - x0 ) / ( x1 - x0 ) );

		return k0 * Mathf.pow( k1 / k0, ( y - y0 ) / ( y1 - y0 ) );

	};

};