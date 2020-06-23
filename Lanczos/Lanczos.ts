export class Lanczos {

	public vertices: Float32Array = new Float32Array( 4 );
	public coefficients: Float32Array = new Float32Array( 2 );

	public window: f32 = 1;

	public autoSolve: boolean = true;

	private _axis: u32 = 1;

	public get axis(): u32 {

		return this._axis;

	};

	public set axis( value: u32 ) {

		if( value !== this._axis ) {

			this._axis = u32( Math.max( 0, Math.min( 1, value ) ) );

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

	): Lanczos {

		return new Lanczos( x0, y0, x1, y1 );

	};

	public solve(): Lanczos {

		let x0: f32 = this.vertices[ 1 - this.axis ],
			y0: f32 = this.vertices[ 0 + this.axis ],
			x1: f32 = this.vertices[ 3 - this.axis ],
			y1: f32 = this.vertices[ 2 + this.axis ],
			inverse_d: f32 = 1 / ( x1 - x0 );

		this.coefficients[ 0 ] = x0 * inverse_d;
		this.coefficients[ 1 ] = inverse_d;

		return this;

	};

	public get( p: f32 ): f32 {

		let y0: f32 = this.vertices[ 0 + this.axis ],
			y1: f32 = this.vertices[ 2 + this.axis ],
			x: f32 = this.coefficients[ 1 ] * p + this.coefficients[ 0 ];

		if( x === 0 ) return 1;

		else if( -this.window <= x && x < this.window ) {

			return this.window * ( 
			
				  y0 * Mathf.sin( Mathf.PI * x ) * Mathf.sin( Mathf.PI * x / this.window ) / Mathf.pow( Mathf.PI * x, 2 )
				+ y1 * Mathf.sin( Mathf.PI * ( x - 1 ) ) * Mathf.sin( Mathf.PI * ( x - 1 ) / this.window ) / Mathf.pow( Mathf.PI * ( x - 1 ), 2 ) 
			
			);

		}
	
		else return 0;

	};

};