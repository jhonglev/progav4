$( document ).ready(function() {
  $("#mensagem_principal").removeClass("invisible");
  $("#link_listar").click(function () {
    $.ajax({
      url: "http://localhost:5000/pagina_principal",
      method: "GET",
      dataType: "json",
      success: listarSapatos,
      error: function () {
        alert("Backend não conectado!");
      }
    });
    function listarSapatos(sapatos) {
      $("#listar_sapatos tr>td").remove();
      for (var i in sapatos) {
        line = `<tr id="linha_${sapatos[i].id}">
          <td>${sapatos[i].id}</td>
          <td>${sapatos[i].modelo}</td>
          <td>${sapatos[i].tamanho}</td>
          <td>${sapatos[i].cor}</td>
          <td>
            <a href="#" id="${sapatos[i].id}" class="excluir_sapato">
              <p class="badge badge-danger">Excluir</p>
            </a>
          </td>
          </tr>`;
        $("#tabela_sapatos").append(line);
      };
      $("#mensagem_principal").addClass("invisible");
      $("#listar_sapatos").removeClass("invisible");
    };
  });
  $("#incluir_sapato").click(function () {
    input_modelo = $("#input_modelo").val();
    input_tamanho = $("#input_tamanho").val();
    input_cor = $("#input_cor").val();
    data_post = JSON.stringify({
      modelo: input_modelo,
      tamanho: input_tamanho,
      cor: input_cor
    });
    $.ajax({
      url: "http://localhost:5000/incluir_sapato",
      type: "POST",
      contentType: "application/json",
      dataType: "json",
      data: data_post,
      success: incluirSapato,
      error: erroIncluir
    });
    function incluirSapato(resposta) {
      if (resposta.status == "passou") {
        alert("Operação concluída");
        $("#input_modelo").val("");
        $("#input_tamanho").val("");
        $("#input_cor").val("");
      } else {
        alert("Operação não concluída");
      }
    };
    function erroIncluir(resposta) {
      alert("Erro no backend");
    };
  });

  $(document).on("click", ".excluir_sapato", function() {
    var idSapato = $(this).attr("id");

    $.ajax({
      url: `http://localhost:5000/excluir_sapato/${idSapato}`,
      type: "DELETE",
      dataType: 'json',
      success: excluirSapato,
      error: erroExclusao
    });

    function excluirSapato(retorno) {
      if (retorno.status === "passou") {
        $(`#linha_${idSapato}`).fadeOut();
      } else {
        alert(`ERRO: ${retorno.status}: ${retorno.detalhes}`);
      }
    }

    function erroExclusao(retorno) {
      alert("Erro na rota");
    }
  });
});