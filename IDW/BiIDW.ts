export class BiIDW {

	public vertices: Float32Array;
	public coefficients: Float32Array;

	public exponent: f32 = 1;

	constructor( vertices: Float32Array, exponent: f32 ) {

		this.vertices = vertices;
		this.exponent = exponent;

	};

	public solve(): BiIDW {

		return this;

	};

	public get( x: f32, y: f32 ): f32 {

		let numerator: f32 = 0,
			denominator: f32 = 0;

		for( let i: u32 = 0; i !== this.vertices.length; i += 3 ) {

			if( x === this.vertices[ i ] && y === this.vertices[ i + 1 ] ) return this.vertices[ i + 2 ];

			let distance: f32 = Mathf.pow(

				( this.vertices[ i ] - x ) ** 2 + ( this.vertices[ i + 1 ] - y ) ** 2, 
				-2 / this.exponent 

			);
			
			numerator += distance * this.vertices[ i + 2 ];
			denominator += distance;

		}

		return numerator / denominator;		

	};

};