export class Trilinear {

	public vertices: Float32Array = new Float32Array( 32 );
	public coefficients: Float32Array = new Float32Array( 8 );

	public autoSolve: boolean = true;

	private _axis: u32 = 1;

	public get axis(): u32 {

		return this._axis;

	};

	public set axis( value: u32 ) {

		if( value !== this._axis ) {

			this._axis = u32( Math.max( 0, Math.min( 3, value ) ) );

			if( this.autoSolve === true ) this.solve();

		}

	};

	constructor( 
	
		x000: f32, y000: f32, z000: f32, w000: f32,
		x001: f32, y001: f32, z001: f32, w001: f32,
		
		x010: f32, y010: f32, z010: f32, w010: f32,
		x011: f32, y011: f32, z011: f32, w011: f32,

		x100: f32, y100: f32, z100: f32, w100: f32,
		x101: f32, y101: f32, z101: f32, w101: f32,
		
		x110: f32, y110: f32, z110: f32, w110: f32,
		x111: f32, y111: f32, z111: f32, w111: f32

	) {

		this.vertices[ 0 ] = x000;
		this.vertices[ 1 ] = y000;
		this.vertices[ 2 ] = z000;
		this.vertices[ 3 ] = w000;

		this.vertices[ 4 ] = x001;
		this.vertices[ 5 ] = y001;
		this.vertices[ 6 ] = z001;
		this.vertices[ 7 ] = w001;

		this.vertices[ 8 ] = x010;
		this.vertices[ 9 ] = y010;
		this.vertices[ 10 ] = z010;
		this.vertices[ 11 ] = w010;

		this.vertices[ 12 ] = x011;
		this.vertices[ 13 ] = y011;
		this.vertices[ 14 ] = z011;
		this.vertices[ 15 ] = w011;

		this.vertices[ 16 ] = x100;
		this.vertices[ 17 ] = y100;
		this.vertices[ 18 ] = z100;
		this.vertices[ 19 ] = w100;

		this.vertices[ 20 ] = x101;
		this.vertices[ 21 ] = y101;
		this.vertices[ 22 ] = z101;
		this.vertices[ 23 ] = w101;

		this.vertices[ 24 ] = x110;
		this.vertices[ 25 ] = y110;
		this.vertices[ 26 ] = z110;
		this.vertices[ 27 ] = w110;

		this.vertices[ 28 ] = x111;
		this.vertices[ 29 ] = y111;
		this.vertices[ 30 ] = z111;
		this.vertices[ 31 ] = w111;

		this.solve();

	};

	public solve(): Trilinear {

		let x_offset: f32 = 0,
			y_offset: f32 = 0,
			z_offset: f32 = 0;

		if( this.axis === 3 ) {

			x_offset = 0;
			y_offset = 0;
			z_offset = 0;

		}

		let x0: f32 = this.vertices[ 0 ],
			y0: f32 = this.vertices[ 1 ],
			z0: f32 = this.vertices[ 2 ],
			x1: f32 = this.vertices[ 28 ],
			y1: f32 = this.vertices[ 29 ],
			z1: f32 = this.vertices[ 30 ],
			inv_vol: f32 = 1 / ( ( x1 - x0 ) * ( y1 - y0 ) * ( z1 - z0 ) ),
			w000: f32 = this.vertices[ 31 ] * inv_vol,
			w001: f32 = this.vertices[ 27 ] * inv_vol,
			w010: f32 = this.vertices[ 23 ] * inv_vol,
			w011: f32 = this.vertices[ 19 ] * inv_vol,
			w100: f32 = this.vertices[ 15 ] * inv_vol,
			w101: f32 = this.vertices[ 11 ] * inv_vol,
			w110: f32 = this.vertices[ 7 ] * inv_vol,
			w111: f32 = this.vertices[ 3 ] * inv_vol;


		this.coefficients[ 0 ] = 
			
			- w000 * x0 * y0 * z0
			+ w001 * x1 * y0 * z0 
			+ w010 * x0 * y1 * z0
			- w011 * x1 * y1 * z0
			+ w100 * x0 * y0 * z1
			- w101 * x1 * y0 * z1
			- w110 * x0 * y1 * z1
			+ w111 * x1 * y1 * z1;

		this.coefficients[ 1 ] = 
			
			  w000 * y0 * z0
			- w001 * y0 * z0
			- w010 * y1 * z0
			+ w011 * y1 * z0
			- w100 * y0 * z1
			+ w101 * y0 * z1
			+ w110 * y1 * z1
			- w111 * y1 * z1;

		this.coefficients[ 2 ] = 
			 
			  w000 * x0 * z0 
			- w001 * x1 * z0
			- w010 * x0 * z0
			+ w011 * x1 * z0
			- w100 * x0 * z1
			+ w101 * x1 * z1
			+ w110 * x0 * z1
			- w111 * x1 * z1
		
		this.coefficients[ 3 ] =
			
			  w000 * x0 * y0
			- w001 * x1 * y0
			- w010 * x0 * y1
			+ w011 * x1 * y1
			- w100 * x0 * y0
			+ w101 * x1 * y0
			+ w110 * x0 * y1
			- w111 * x1 * y1;

		this.coefficients[ 4 ] = 
			
			- w000 * z0
			+ w001 * z0
			+ w010 * z0
			- w011 * z0
			+ w100 * z1
			- w101 * z1
			- w110 * z1
			+ w111 * z1;
		
		this.coefficients[ 5 ] = 
			
			- w000 * y0
			+ w001 * y0
			+ w010 * y1
			- w011 * y1
			+ w100 * y0
			- w101 * y0
			- w110 * y1
			+ w111 * y1;

		this.coefficients[ 6 ] = 
			
			- w000 * x0
			+ w001 * x1
			+ w010 * x0
			- w011 * x1
			+ w100 * x0
			- w101 * x1
			- w110 * x0
			+ w111 * x1

		this.coefficients[ 7 ] = 
			
			  w000
			- w001
			- w010
			+ w011
			- w100
			+ w101
			+ w110
			- w111;

		

		return this;

	};

	public get( x: f32, y: f32, z: f32 ): f32 {

		return this.coefficients[ 0 ]
			+ this.coefficients[ 1 ] * x
			+ this.coefficients[ 2 ] * y
			+ this.coefficients[ 3 ] * z
			+ this.coefficients[ 4 ] * x * y
			+ this.coefficients[ 5 ] * x * z
			+ this.coefficients[ 6 ] * y * z
			+ this.coefficients[ 7 ] * x * y * z;

	};

};