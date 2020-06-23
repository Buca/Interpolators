export class Linear {

	public vertices: Float32Array = new Float32Array( 4 );
	public coefficients: Float32Array = new Float32Array( 2 );

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

	constructor( x0:f32, y0:f32, x1:f32, y1:f32 ) {

		this.vertices[ 0 ] = x0;
		this.vertices[ 1 ] = y0;
		this.vertices[ 2 ] = x1;
		this.vertices[ 3 ] = y1;

		this.solve();

	};

	static create( 

		x0: f32, y0: f32,
		x1: f32, y1: f32 

	): Linear {

		return new Linear( x0, y0, x1, y1 );

	};

	public solve(): Linear {

		let x0: f32 = this.vertices[ 1 - this.axis ],
			y0: f32 = this.vertices[ 0 + this.axis ],
			x1: f32 = this.vertices[ 3 - this.axis ],
			y1: f32 = this.vertices[ 2 + this.axis ],
			inverse_d: f32 = 1 / ( x1 - x0 );

		this.coefficients[ 0 ] = inverse_d * ( x1 * y0 - x0 * y1 );
		this.coefficients[ 1 ] = inverse_d * ( y1 - y0 );

		return this;

	};

	public get( p: f32 ): f32 {

		return this.coefficients[ 0 ] + this.coefficients[ 1 ] * p;

	};

};