export class Bilinear {

	public vertices: Float32Array = new Float32Array( 12 );
	public coefficients: Float32Array = new Float32Array( 4 );

	public autoUpdate: boolean = true;

	private _axis: u32 = 2;

	public get axis(): u32 {

		return this._axis;

	};

	public set axis( value: u32 ) {

		if( value !== this._axis ) {

			this._axis = u32( Math.max( 0, Math.min( 2, value ) ) );

			if( this.autoUpdate === true ) this.solve();

		}

	};

	constructor( 
 
		x00: f32, y00: f32, z00: f32,
		x01: f32, y01: f32, z01: f32,
		x10: f32, y10: f32, z10: f32,
		x11: f32, y11: f32, z11: f32 

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

	static create( 

		x00: f32, y00: f32, z00: f32,
		x01: f32, y01: f32, z01: f32,
		x10: f32, y10: f32, z10: f32,
		x11: f32, y11: f32, z11: f32

	): Bilinear {

		return new Bilinear( 

			x00, y00, z00,
			x01, y01, z01,
			x10, y10, z10,
			x11, y11, z11

		);

	};

	public solve(): Bilinear {

		let y_offset: u32 = 0,
			x_offset: u32 = 0;

		if( this.axis === 2 ) {

			x_offset = 0;
			y_offset = 1;

		}
		else if( this.axis === 1 ) {

			x_offset = 2
			y_offset = 0;

		}
		else if( this.axis === 0 ) {

			x_offset = 1;
			y_offset = 2;

		}

		let x0: f32 = this.vertices[ x_offset ],
			y0: f32 = this.vertices[ y_offset ],
			x1: f32 = this.vertices[ 9 + x_offset ],
			y1: f32 = this.vertices[ 9 + y_offset ],
			w00: f32 = this.vertices[ 0 + this.axis ],
			w10: f32 = this.vertices[ 3 + this.axis ],
			w01: f32 = this.vertices[ 6 + this.axis ],
			w11: f32 = this.vertices[ 9 + this.axis ], 
			total: f32 = 1 / ( ( x1 - x0 ) * ( y1 - y0 ) );

		this.coefficients[ 0 ] = total * ( y0 * ( w11 * x0  - w01 * x1 )  +  y1 * ( -w10 * x0  + w00 * x1 ) );
		this.coefficients[ 1 ] = total * ( - w11 * y0 + w01 * y0 + w10 * y1 - w00 * y1 );
		this.coefficients[ 2 ] = total * ( - w11 * x0 + w01 * x1 + w10 * x0 - w00 * x1 );
		this.coefficients[ 3 ] = total * ( w11 - w01 - w10 + w00 );

		return this;

	};

	public get( p0: f32, p1: f32 ): f32 {

		return this.coefficients[ 0 ] + p0 * this.coefficients[ 1 ] + p1 * this.coefficients[ 2 ] + p0 * p1 * this.coefficients[ 3 ];

	};

};
