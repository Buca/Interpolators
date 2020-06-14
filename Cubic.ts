export class Cubic {

	public vertices: Float32Array = new Float32Array( 8 );
	public coefficients: Float32Array = new Float32Array( 4 );

	public autoUpdate: boolean = true;

	private _axis: u32 = 1;

	public get axis(): u32 {

		return this._axis;

	};

	public set axis( value: u32 ) {

		if( value !== this._axis ) {

			this._axis = u32( Math.max( 0, Math.min( 1, value ) ) );

			if( this.autoUpdate === true ) this.solve();

		}

	};

	constructor( 

		x0: f32, y0: f32,
		x1: f32, y1: f32,
		x2: f32, y2: f32,
		x3: f32, y3: f32 

	) {

		this.vertices = new Float32Array( 8 );
		this.coefficients = new Float32Array( 4 );

		this.vertices[ 0 ] = x0; 
		this.vertices[ 1 ] = y0;
		this.vertices[ 2 ] = x1;
		this.vertices[ 3 ] = y1;
		this.vertices[ 4 ] = x2;
		this.vertices[ 5 ] = y2;
		this.vertices[ 6 ] = x3;
		this.vertices[ 7 ] = y3;

		this.solve();

	}

	public solve(): Cubic {

		let x0 : f32 = this.vertices[ 1 - this.axis ],
			x1 : f32 = this.vertices[ 3 - this.axis ],
			x2 : f32 = this.vertices[ 5 - this.axis ],
			x3 : f32 = this.vertices[ 7 - this.axis ],

			x00 : f32 = x0 * x0,
			x11 : f32 = x1 * x1,
			x22 : f32 = x2 * x2,
			x33 : f32 = x3 * x3,

			x01 : f32 = x0 * x1,
			x02 : f32 = x0 * x2,
			x03 : f32 = x0 * x3,
			x12 : f32 = x1 * x2,
			x13 : f32 = x1 * x3,
			x23 : f32 = x2 * x3,
			
			x123 : f32 = x12 * x3,
			x023 : f32 = x02 * x3,
			x013 : f32 = x01 * x3,
			x012 : f32 = x01 * x2,
			
			inv123 : f32 = this.vertices[ 0 + this.axis ] / ( x0 * ( x00 - x0 * ( x1 + x2 + x3 ) + ( x12 + x13 + x23 ) ) - x123 ),
			inv023 : f32 = this.vertices[ 2 + this.axis ] / ( x1 * ( x11 - x1 * ( x0 + x2 + x3 ) + ( x02 + x03 + x23 ) ) - x023 ),
			inv013 : f32 = this.vertices[ 4 + this.axis ] / ( x2 * ( x22 - x2 * ( x0 + x1 + x3 ) + ( x01 + x03 + x13 ) ) - x013 ),
			inv012 : f32 = this.vertices[ 6 + this.axis ] / ( x3 * ( x33 - x3 * ( x0 + x1 + x2 ) + ( x01 + x02 + x12 ) ) - x012 );

		this.coefficients[ 0 ] = - inv123 * x123 - inv023 * x023 - inv013 * x013 - inv012 * x012;
		this.coefficients[ 1 ] = inv123 * ( x12 + x13 + x23 ) + inv023 * ( x02 + x03 + x23 ) + inv013 * ( x01 + x03 + x13 ) + inv012 * ( x01 + x02 + x12 );
		this.coefficients[ 2 ] = - inv123 * ( x1 + x2 + x3 ) - inv023 * ( x0 + x2 + x3 ) - inv013 * ( x0 + x1 + x3 ) - inv012 * ( x0 + x1 + x2 );
		this.coefficients[ 3 ] = inv123 + inv023 + inv013 + inv012;

		return this;

	};

	public get( x: f32 ): f32 {

		if( x === this.vertices[ 1 - this.axis ] ) return this.vertices[ 0 + this.axis ];
		else if( x === this.vertices[ 3 - this.axis ] ) return this.vertices[ 2 + this.axis ];
		else if( x === this.vertices[ 5 - this.axis ] ) return this.vertices[ 4 + this.axis ];
		else if( x === this.vertices[ 5 - this.axis ] ) return this.vertices[ 4 + this.axis ];

		return x * ( x * ( x * this.coefficients[ 3 ] + this.coefficients[ 2 ] ) + this.coefficients[ 1 ] ) + this.coefficients[ 0 ];

	};

};
