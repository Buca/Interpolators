export class QuadraticTrig {

	public vertices: Float32Array = new Float32Array( 6 );
	public coefficients: Float32Array = new Float32Array( 3 );

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

	constructor( 
	
		x0: f32, y0: f32,
		x1: f32, y1: f32,
		x2: f32, y2: f32 
	
	) {


		this.vertices[ 0 ] = x0; 
		this.vertices[ 1 ] = y0;
		this.vertices[ 2 ] = x1;
		this.vertices[ 3 ] = y1;
		this.vertices[ 4 ] = x2;
		this.vertices[ 5 ] = y2;

		this.solve();

	};

	public solve(): QuadraticTrig {

		let x0: f32 = this.vertices[ 1 - this.axis ],
			x1: f32 = this.vertices[ 3 - this.axis ],
			x2: f32 = this.vertices[ 5 - this.axis ],
			w0: f32 = this.vertices[ 0 + this.axis ],
			w1: f32 = this.vertices[ 2 + this.axis ],
			w2: f32 = this.vertices[ 4 + this.axis ],
			dx01: f32 = Mathf.sin( .5 * ( x0 - x1 ) ),
			dx02: f32 = Mathf.sin( .5 * ( x0 - x2 ) ),
			dx10: f32 = Mathf.sin( .5 * ( x1 - x0 ) ),
			dx12: f32 = Mathf.sin( .5 * ( x1 - x2 ) ),
			dx20: f32 = Mathf.sin( .5 * ( x2 - x0 ) ),
			dx21: f32 = Mathf.sin( .5 * ( x2 - x1 ) );

		this.coefficients[ 0 ] = w0 / ( dx01 * dx02 );
		this.coefficients[ 1 ] = w1 / ( dx10 * dx12 );
		this.coefficients[ 2 ] = w2 / ( dx20 * dx21 );

		return this;

	};

	public get( p: f32 ): f32 {

		//return p * ( p * this.coefficients[ 2 ] + this.coefficients[ 1 ] ) + this.coefficients[ 0 ];

		let x0: f32 = this.vertices[ 1 - this.axis ],
			x1: f32 = this.vertices[ 3 - this.axis ],
			x2: f32 = this.vertices[ 5 - this.axis ],
			dx0: f32 = Mathf.sin( .5 * ( p - x0 ) ),
			dx1: f32 = Mathf.sin( .5 * ( p - x1 ) ),
			dx2: f32 = Mathf.sin( .5 * ( p - x2 ) );

		return this.coefficients[ 0 ] * dx1 * dx2 + this.coefficients[ 1 ] * dx0 * dx2 + this.coefficients[ 2 ] * dx0 * dx1;

	};

};