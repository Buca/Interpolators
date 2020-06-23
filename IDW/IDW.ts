export class IDW {

	public vertices: Float32Array;
	public coefficients: Float32Array;

	public exponent: f32 = 1;

	constructor( vertices: Float32Array, exponent: f32 ) {

		this.vertices = vertices;
		this.exponent = exponent;

	};

	public solve(): IDW {

		return this;

	};

	public get( x: f32 ): f32 {

		let numerator: f32 = 0,
			denominator: f32 = 0;

		for( let i: u32 = 0; i !== this.vertices.length; i += 2 ) {

			if( x === this.vertices[ i ] ) return this.vertices[ i + 1 ];

			let distance: f32 = Mathf.pow(

				Mathf.abs( this.vertices[ i ] - x ), 
				-1 / this.exponent

			);
			
			numerator += distance * this.vertices[ i + 1 ];
			denominator += distance;

		}

		return numerator / denominator;		

	};

};