let data = {
	year:2010,
	season:15
}
let inputs = document.querySelectorAll('input')
inputs.forEach(input=>
	input.oninput = function(){
		document.querySelector('#'+this.name).innerText = this.value
		data[this.name] = this.value
		$('table').hide();
		$('p').show();
		console.log(data)
	}
)
document.querySelector('button').onclick = function(event){
	event.preventDefault()
	$('p').hide();
	$.ajax({
		url: `https://ergast.com/api/f1/${data.year}/${data.season}/driverStandings.json`,
		success: function(result){
			// $("#result").html(result.title);
			result.MRData.StandingsTable.StandingsLists[0].DriverStandings.forEach(driver=>{
				document.querySelector('tbody').innerHTML += `
					<tr>
						<td>${driver.position}</td>
						<td>${driver.wins}</td>
						<td>
						<a href='${driver.Driver.url}' target="_blank">
							${driver.Driver.givenName} ${driver.Driver.familyName}
						</a>
						</td>
						<td>${driver.Driver.nationality}</td>
						<td>${driver.Driver.givenName}</td>
						<td>
							<a href='${driver.Constructors[0].url}' target="_blank">
								${driver.Constructors[0].name}
							</a>
						</td>
					</tr>
				`
			})
			$('table').show();
		}
	});
}