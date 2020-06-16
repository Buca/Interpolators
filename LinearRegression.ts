export class LinearRegression {

	public samples: Float32Array;
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

	static create( samples: Float32Array ): LinearRegression {

		return new LinearRegression( samples );

	};

	constructor( samples: Float32Array ) {

		this.samples = samples;

	};

	public solve(): LinearRegression {

		let ax: f32 = 0,
			ay: f32 = 0,
			inverse_size: f32 = 2 / f32( this.samples.length ),
			sxx: f32 = 0, 
			sxy: f32 = 0;

		for( let i: i32 = 0; i !== this.samples.length; i += 2 ) {

			ax += this.samples[ i + 1 - this.axis ];
			ay += this.samples[ i + this.axis];

		}

		ax *= inverse_size;
		ay *= inverse_size;

		for( let i: u32 = 0; i !== this.samples.length; i += 2 ) {

			sxx += Mathf.pow( this.samples[ i + 1 - this.axis ] - ax, 2 );
			sxy += ( this.samples[ i + 1 - this.axis ] - ax ) * ( this.samples[ i + this.axis ] - ay )

		}

		this.coefficients[ 0 ] = ( sxy / sxx ) * ax + ay;
		this.coefficients[ 1 ] = sxy / sxx;

		return this;

	};

	public get(): f32 {

		return this.coefficients[ 1 ] * x + this.coefficients[ 0 ];

	};

};