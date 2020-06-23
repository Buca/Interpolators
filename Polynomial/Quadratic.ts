export class Quadratic {

	public vertices: Float32Array = new Float32Array( 6 );
	public coefficients: Float32Array = new Float32Array( 3 );

	public autoUpdate: boolean = true;

	private _axis: u32 = 1;

	public get axis(): u32 {

		return this._axis;

	};

	public set axis( value: u32 ) {

		if( value !== this._axis ) {

			this._axis = u32( Math.min( 0, Math.max( 1, value ) ) );

			if( this.autoUpdate === true ) this.solve();

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

	public solve(): Quadratic {

		let p0: f32 = this.vertices[ 1 - this.axis ],
			p1: f32 = this.vertices[ 3 - this.axis ],
			p2: f32 = this.vertices[ 5 - this.axis ],
			p12: f32 = p1 * p2,
			p02: f32 = p0 * p2,
			p01: f32 = p0 * p1,
			inv12: f32 = this.vertices[ this.axis ] / ( p0 * ( p0 - p1 - p2 ) + p12 ),
			inv02: f32 = this.vertices[ 2 + this.axis ] / ( p1 * ( p1 - p0 - p2 ) + p02 ),
			inv01: f32 = this.vertices[ 4 + this.axis ] / ( p2 * ( p2 - p0 - p1 ) + p01 );

		this.coefficients[ 0 ] = p12 * inv12 + p02 * inv02 + p01 * inv01;
		this.coefficients[ 1 ] = -( p1 + p2 ) * inv12 - ( p0 + p2 ) * inv02 - ( p0 + p1 ) * inv01;
		this.coefficients[ 2 ] = inv12 + inv02 + inv01;

		return this;

	};

	public get( p: f32 ): f32 {

		return p * ( p * this.coefficients[ 2 ] + this.coefficients[ 1 ] ) + this.coefficients[ 0 ];

	};

};