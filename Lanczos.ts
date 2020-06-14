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

		//let x0: f32 = this.vertices[ 1 - this.axis ],
		//	y0: f32 = this.vertices[ 0 + this.axis ],
		//	x1: f32 = this.vertices[ 3 - this.axis ],
		//	y1: f32 = this.vertices[ 2 + this.axis ],
		//	inverse_d: f32 = 1 / ( x1 - x0 );

		//this.coefficients[ 0 ] = inverse_d * ( x1 * y0 - x0 * y1 );
		//this.coefficients[ 1 ] = inverse_d * ( y1 - y0 );

		return this;

	};

	public get( p: f32 ): f32 {

		let x0: f32 = this.vertices[ 0 ],
			y0: f32 = this.vertices[ 1 ],
			x1: f32 = this.vertices[ 2 ],
			y1: f32 = this.vertices[ 3 ],
			x: f32 = ( p - x0 ) / ( x1 - x0 );

		return y0 * lanczosKernel( this.window, ( p - x0 ) / ( x1 - x0 ) ) + y1 * lanczosKernel( this.window, ( p - x0 ) / ( x1 - x0 ) - 1 );

	};

};

function lanczosKernel( window: f32, x: f32 ):f32 {

	if( x === 0 ) return 1;

	else if( -range <= x && x < range ) {

		return window * Mathf.sin( Mathf.PI * x ) * Mathf.sin( Mathf.PI * x / window ) / Mathf.pow( Mathf.PI * x, 2 );

	}
	
	else return 0;

};
