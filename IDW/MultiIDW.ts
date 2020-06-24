export class MultiIDW {

	public vertices: Float32Array;
	public dimension: u32;
	public power: f32 = 1;

	constructor( dimension: u32, vertices: Float32Array ) {

		this.vertices = vertices;
		this.dimension = dimension;

	};

	public solve(): MultiIDW {

		return this;

	};

	public get( v: Float32Array ): f32 {

		let numerator:f32 = 0,
			denominator:f32 = 0;

		for( let i:u32 = 0; i !== this.vertices.length; i += this.dimension + 1 ) {

			let distance: f32 = 0;

			for( let j: u32 = 0; j !== this.dimension; j ++ ) {

				distance += ( this.vertices[ i + j ] - v[ j ] ) ** 2;

			}

			if( distance === 0 ) return this.vertices[ i + this.dimension ];

			distance = Mathf.pow( distance, - 1 / ( 2 * this.power ) );
			
			numerator += distance * this.vertices[ i + v.length ];
			denominator += distance;

		}

		return numerator / denominator;


	};

};