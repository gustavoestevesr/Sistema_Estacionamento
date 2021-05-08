function carregar() {

    var veiculos = JSON.parse(localStorage.getItem('estacionamento'))

    var tabela = document.getElementById('tabela')
    
    if (veiculos) {
        var qtd = veiculos.length

        tabela.innerHTML =
            `
                <tr>
                    <th>ID</th>
                    <th>Data</th>
                    <th>Horário</th>
                    <th>Modelo</th>
                    <th>Placa</th>
                    <th>Ação</th>
                </tr>
        `

        for (let index = 0; index < qtd; index++) {
            tabela.innerHTML +=
                `
            <tr>
                <td>${index}</td>
                <td>${veiculos[index].data}</td>
                <td>${veiculos[index].horario}</td>
                <td>${veiculos[index].modelo}</td>
                <td>${veiculos[index].placa}</td>
                <td><input type="button" value="remover" style="background-color: red;" id="remover" onclick="remover(${index})"></td>
            </tr>
        `
        }

        draw_chart()
    }
}

function remover(id) {

    var veiculos = JSON.parse(localStorage.getItem('estacionamento'))

    veiculos.splice(id, 1); 

    localStorage.setItem('estacionamento', JSON.stringify(veiculos))

    carregar()

}

function procurar() {

    var placa_procurar = document.getElementById('placa_procurar')

    if (placa_procurar.value.length == 0) {
        carregar()
    } else {
        var veiculos = JSON.parse(localStorage.getItem('estacionamento'))
        var qtd = veiculos.length

        tabela.innerHTML =
            `
                <tr>
                    <th>ID</th>
                    <th>Data</th>
                    <th>Horário</th>
                    <th>Modelo</th>
                    <th>Placa</th>
                    <th>Ação</th>
                </tr>
        `

        for (let index = 0; index < qtd; index++) {
            if (veiculos[index].placa == placa_procurar.value) {

                tabela.innerHTML +=
                    `
            <tr>
                <td>${index}</td>
                <td>${veiculos[index].data}</td>
                <td>${veiculos[index].horario}</td>
                <td>${veiculos[index].modelo}</td>
                <td>${veiculos[index].placa}</td>
                <td><input type="button" value="remover" style="background-color: red;" id="remover" onclick="remover(${index})"></td>
            </tr>
        `
            }

        }
    }

    placa_procurar.value = ''

}

function cadastrar() {

    var modelo = document.getElementById('modelo')
    var placa = document.getElementById('placa')

    if (modelo.value.length > 0 && placa.value.length > 0) {

        var data = new Date()

        veiculo = {
            placa: placa.value,
            modelo: modelo.value,
            data: `${data.getDate()}/${data.getMonth()}/${data.getFullYear()}`,
            horario: `${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`
        }

        if (localStorage.getItem('estacionamento') === null) {
            var veiculos = []
        } else {
            var veiculos = JSON.parse(localStorage.getItem('estacionamento'))
        }
        veiculos.push(veiculo)
        localStorage.setItem('estacionamento', JSON.stringify(veiculos))

        placa.value = ''
        modelo.value = ''

        carregar()

        draw_chart()

        console.log(veiculo);

    } else {

        console.log("Preencher campos!");

    }


}

function draw_chart(){

    // set the data
    //var data2 = {
    //header: ["Name", "Death toll"],
    //rows: [
    //["San-Francisco (1906)", 1500],
    //["Messina (1908)", 87000],
    //["Ashgabat (1948)", 175000],
    //["Chile (1960)", 10000],
    //["Tian Shan (1976)", 242000],
    // ["Armenia (1988)", 25000],
    // ["Iran (1990)", 50000]
    //]};

    var veiculos = JSON.parse(localStorage.getItem('estacionamento'))

    if (veiculos) {

        var qtd = veiculos.length

    }else{
        
        var qtd = 0

    }

    // set the data
    var data = {
        header: ["Nome", "Total de Veículos"],
        rows: [
            ["Veículos", qtd]
        ]
    };

    // create the chart
    chart = anychart.column();

    // add the data
    chart.data(data);

    // set the chart title
    chart.title("Total de Veículos Ativos");

    // draw
    chart.container("container");
    chart.draw();
    
}
