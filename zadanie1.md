<h2>Laboratorium programowania aplikacji w chmurach obliczeniowych.</h2>


### 1. Proszę napisać program serwera (dowolny język programowania), który realizować będzie następującą funkcjonalność: 
*a. po uruchomieniu kontenera, serwer pozostawia w logach informację o dacie uruchomienia, imieniu i nazwisku autora serwera (imię i nazwisko studenta) oraz porcie TCP, na którym serwer nasłuchuje na zgłoszenia klienta.*
*b. na podstawie adresu IP klienta łączącego się z serwerem, w przeglądarce powinna zostać wyświetlona strona informująca o adresie IP klienta i na podstawie tego adresu IP, o dacie i godzinie w jego strefie czasowej.*

![localhost_app](/images/heroku2v2.PNG)
![heroku_app](/images/heroku1.PNG)
![start_app](/images/heroku3.PNG)

Kod aplikacji znajduje się w repozytorium, zaś dodatkowo w kodzie znajdują się komentarze objaśniające działanie programu.

Test działania aplikacji można wykonać [tutaj](http://cloudstech-test-app.herokuapp.com/) z wykorzystaniem platformy Heroku (uruchomiono dla testu aplikacji z pozyskaniem adresów ip innych niż localhost).


### 2. Opracować plik Dockerfile, który pozwoli na zbudowanie obrazu kontenera realizującego funkcjonalność opisaną w punkcie 1. 
*Przy ocenie brane będzie sposób opracowania tego pliku (dobór obrazu bazowego, wieloetapowe budowanie obrazu, ewentualne wykorzystanie warstwy scratch, optymalizacja pod kątem funkcjonowania cache-a w procesie budowania). Dockerfile powinien również zawierać informację o autorze tego pliku (ponownie imię i nazwisko studenta).*

Plik Dockerfile znajduje się w repozytorium.

### 3. Należy podać polecenia niezbędne do:
*a. zbudowania opracowanego obrazu kontenera,*

`$ docker image build -f Dockerfile -t dockerimage .`

*b. uruchomienia kontenera na podstawie zbudowanego obrazu,*

`$ docker run -it -p 8080:8080 --name dockerapp dockerimage`

*c. sposobu uzyskania informacji, które wygenerował serwer w trakcie uruchamiana kontenera (patrz: punkt 1a),*

Informacje są wyświetlane przy uruchomieniu kontenera.

*d. sprawdzenia, ile warstw posiada zbudowany obraz.*

`$ docker history dockerimage`

*(nazwy obrazu i uruchamianego kontenera są poglądowe i mogą się różnić)*


### 4. Zbudować obrazy kontenera z aplikacją opracowaną w punkcie nr 1, które będą pracował na architekturach: linux/arm/v7, linux/arm64/v8 oraz linux/amd64. 
*Obrazy te należy przesłać do swojego repozytorium na DockerHub. W sprawozdaniu należy podać wykorzystane instrukcje wraz z wynikiem ich działania i ewentualnymi komentarzami.*

Instalacja zasobów qemu w dedykowanym kontenerze.
`$ docker run --rm --privileged multiarch/qemu-user-static --reset -p yes`
Utworzenie środowiska budowania obrazów wykorzystującego buildx.
`$ docker buildx create --name dockerbuildx`
`$ docker buildx use dockerbuildx`
Zbudowanie obrazów dla wybranych architektur sprzętowych.
`$ docker buildx build -t michalnurz/labox:tchdocker --platform linux/arm/v7,linux/arm64/v8,linux/amd64 --push .`

[Repozytorium na DockerHub](https://hub.docker.com/layers/206189827/michalnurz/labox/tchdocker/images/sha256-f4a21c9ace5a7ae489a0905df94a4ef270b1e7e43fa1949fffcbf344c7c95507?context=repo)

![multiarch_qemu](/images/multiarch_qemu.PNG)
![build_arch_1](/images/docker_build_arch_1.PNG)
![build_arch_2](/images/docker_build_arch_2.PNG)


### Zadanie 4 z zastosowaniem GitHub Actions

Zbudowanie obrazu na wiele architektur:
[Kod pliku multi-arch.yml](https://github.com/remqes/cloudstech-test-app/blob/master/.github/workflows/multi-arch/multi-arch.yml)
[Przebieg zbudowania obrazu](https://github.com/remqes/cloudstech-test-app/actions/runs/2272253093)

Repozytorium DockerHub dla zbudowanych obrazów:
[Repozytorium na DockerHub](https://hub.docker.com/layers/206300456/michalnurz/labox/gittchdocker/images/sha256-be376c1e7f45f6e47bd841833cf27e32a9cef55c79e8169b117cad897a674003?context=repo)

Zbudowanie obrazu z wykorzystaniem GHCR:
[Kod pliku docker.yml](https://github.com/remqes/cloudstech-test-app/blob/master/.github/workflows/ghcrdocker.yml)
